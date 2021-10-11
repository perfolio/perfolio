import { PrismaClient } from "@perfolio/integrations/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { idGenerator } from "@perfolio/id"
import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { z } from "zod"
import { HTTPError } from "@perfolio/util/errors"

const validation = z.object({
  data: z.object({
    user_id: z.string(),
    object: z.enum(["session"]),
  }),
  object: z.enum(["event"]),
  type: z.enum(["session.created"]),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    console.log(req.body)
    const {
      data: { user_id: clerkId },
    } = await validation.parseAsync(req.body).catch((err) => {
      throw new Error(`Invalid request: ${err}`)
    })

    const prisma = new PrismaClient()

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    })
    if (existingUser) {
      return
    }

    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${clerkId}`, {
      headers: {
        authorization: `Bearer ${env.require("CLERK_API_KEY")}`,
      },
    })
    if (!userResponse.ok) {
      throw new HTTPError(500, `Unable to get user from clerk: ${await userResponse.text()}`)
    }
    const user = (await userResponse.json()) as {
      primary_email_address_id: string
      email_addresses: { id: string; email_address: string }[]
    }

    const email = user.email_addresses.find(
      (addr) => addr.id === user.primary_email_address_id,
    )!.email_address

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const customer = await stripe.customers.create({ email })
    const subscription = await stripe.subscriptions
      .create({
        customer: customer.id,
        trial_period_days: 7,
        items: [
          {
            // Growth subscription
            price:
              env.get("NODE_ENV") === "production"
                ? "price_1JU4LpG0ZLpKb1P6Szj2jJQr"
                : "plan_K9CYicTThbEqNP",
          },
        ],
      })
      .catch((err) => {
        throw new HTTPError(500, `Unable to create subscription for user ${email}: ${err}`)
      })

    await prisma.user.create({
      data: {
        id: idGenerator.id("user"),
        clerkId,
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        currentPaymentPeriodStart: new Date(subscription.current_period_start),
        currentPaymentPeriodEnd: new Date(subscription.current_period_end),
        portfolios: {
          create: [
            {
              id: idGenerator.id("portfolio"),
              name: "My Portfolio",
              primary: true,
            },
          ],
        },
        settings: {
          create: {
            defaultCurrency: "EUR",
            defaultExchangeMic: "xetr",
          },
        },
      },
    })
  } catch (err) {
    console.error(err)
    res.status(err instanceof HTTPError ? err.status : 500)
    res.send(err.message)
  } finally {
    res.end()
  }
}

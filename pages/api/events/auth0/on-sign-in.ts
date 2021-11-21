import { env } from "@chronark/env"
import { newId } from "@perfolio/pkg/id"
import { PrismaClient, UserModel } from "@perfolio/pkg/integrations/prisma"
import { HttpError } from "@perfolio/pkg/util/errors"
import { NextApiRequest, NextApiResponse } from "next"
import { Stripe } from "stripe"
import { Logger } from "tslog"
import { z } from "zod"

const validation = z.object({
  headers: z.object({
    "content-type": z.enum(["application/json"]),
    authorization: z.string().nonempty(),
  }),
  body: z.object({
    userId: z.string(),
    email: z.string().email(),
  }),
  method: z.enum(["POST"]),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "on sign in" })
  try {
    logger.debug(typeof req.body, req.body, req.headers)
    const {
      headers: { authorization },
      body: { userId, email },
    } = await validation.parseAsync(req).catch((err) => {
      throw new HttpError(400, err.message)
    })
    if (authorization !== env.require("AUTH0_WEBHOOK_TOKEN")) {
      throw new HttpError(403, "Not authorized")
    }

    const prisma = new PrismaClient()
    let user: UserModel | null
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
        apiVersion: "2020-08-27",
        typescript: true,
      })

      const customer = await stripe.customers.create({
        email,
      })
      const subscription = await stripe.subscriptions
        .create({
          customer: customer.id,
          trial_period_days: 7,
          items: [
            {
              // Growth subscription
              price: env.get("NODE_ENV") === "production"
                ? "price_1JU4LpG0ZLpKb1P6Szj2jJQr"
                : "plan_K9CYicTThbEqNP",
            },
          ],
        })
        .catch((err) => {
          throw new HttpError(
            500,
            `Unable to create subscription for user ${email}: ${err}`,
          )
        })

      user = await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          stripeCustomerId: customer.id,
          stripeSubscriptionId: subscription.id,
          currentPaymentPeriodStart: new Date(
            subscription.current_period_start,
          ),
          currentPaymentPeriodEnd: new Date(subscription.current_period_end),
          portfolios: {
            create: [
              {
                id: newId("portfolio"),
                name: "My Portfolio",
                primary: true,
              },
            ],
          },
          settings: {
            create: {
              defaultCurrency: "EUR",
              defaultExchangeId: "xetr",
            },
          },
        },
      })
    }
    res.json({ received: true })
  } catch (err) {
    logger.error(err)
    res.status(err instanceof HttpError ? err.status : 500)
  } finally {
    res.end()
  }
}

export default handler

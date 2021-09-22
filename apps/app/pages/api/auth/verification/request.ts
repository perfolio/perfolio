import { NextApiHandler } from "next"
import { z } from "zod"
import { Auth } from "@perfolio/auth"
import { send } from "@perfolio/integrations/sendgrid"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { idGenerator } from "@perfolio/id"
import { Stripe } from "stripe"
import { HTTPError } from "@perfolio/util/errors"
import { env } from "@chronark/env"
/**
 * Create a new verification request and send the token to the user's email
 */

const validation = z.object({
  email: z.string().email(),
})

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405)
      res.setHeader("Allow", "POST")
      return res.end()
    }
    const prisma = new PrismaClient()
    const auth = new Auth(prisma)

    const { email } = await validation.parseAsync(req.body).catch((err) => {
      throw new HTTPError(400, err.message)
    })

    if (!email.includes("perfol.io") && !email.includes("chronark")) {
      throw new HTTPError(403, "Signup currently disabled")
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
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
          email,
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
    }
    const { otp } = await auth.createAuthenticationRequest(email).catch((err) => {
      throw new HTTPError(500, `Unable to create session in database: ${err}`)
    })

    // send email
    await send(email, "Your OTP", otp).catch((err) => {
      throw new HTTPError(500, err.message)
    })

    res.json({ status: "OK" })
  } catch (err) {
    res.status(err instanceof HTTPError ? err.status : 500)
    return res.send(err.message)
  } finally {
    res.end()
  }
}

export default handler

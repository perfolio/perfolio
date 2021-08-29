import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { Logger } from "tslog"
import { buffer } from "micro"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { Time } from "@perfolio/util/time"

const validation = z.object({
  method: z.string().refine((m) => m === "POST"),
  headers: z.object({
    "stripe-signature": z.string(),
  }),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "Stripe Webhook" })
  try {
    const {
      headers: { "stripe-signature": signature },
    } = validation.parse(req)

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const event = stripe.webhooks.constructEvent(
      (await buffer(req)).toString(),
      signature,
      env.require("STRIPE_WEBHOOK_SECRET"),
    )
    // logger.info({ event })

    const prisma = new PrismaClient()

    if (event.type === "checkout.session.completed") {
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.

      const { id: stripeSubscriptionId, customer: stripeCustomerId } = z
        .object({
          id: z.string(),
          customer: z.string(),
          customer_details: z.object({
            email: z.string().email(),
          }),
        })
        .parse(event.data.object)

      const user = await prisma.user.findUnique({ where: { stripeCustomerId } })
      if (!user) {
        throw new Error(`No user found`)
      }

      const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)

      logger.debug(event)
      const update = {
        stripeSubscriptionId,
        stripeCustomerId,
        payedUntil: Time.fromTimestamp(stripeSubscription.current_period_end).toDate(),
      }
      await prisma.subscription.upsert({
        where: { stripeSubscriptionId },
        update,
        create: { ...update, userId: user.id },
      })
      logger.debug("Subscription updated")
    }
    //     case 'invoice.paid':
    //       // Continue to provision the subscription as payments continue to be made.
    //       // Store the status in your database and check when a user accesses your service.
    //       // This approach helps you avoid hitting rate limits.
    //       break;
    //     case 'invoice.payment_failed':
    //       // The payment failed or the customer does not have a valid payment method.
    //       // The subscription becomes past_due. Notify your customer and send them to the
    //       // customer portal to update their payment information.
    //       break;
    //     default:
    //     // Unhandled event type
    //   }
  } catch (err) {
    logger.error(err)
    res.status(500)
    res.send(err.message)
  } finally {
    res.end()
  }
}

export default handler
// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

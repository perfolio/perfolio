import { env } from "@chronark/env"
import { Logger } from "@perfolio/pkg/logger"
import { HttpError } from "@perfolio/pkg/util/errors"
import { NextApiRequest, NextApiResponse } from "next"
import { Stripe } from "stripe"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "manage subscription" })
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }

  if (!req.query["customerId"]) {
    res.status(400)
    return res.end("customerId is missing in query")
  }
  const customerId = req.query["customerId"] as string

  try {
    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const activeSubscriptions = await stripe.subscriptions.list({
      customer: customerId,
    })

    if (activeSubscriptions.data.length > 0) {
      /**
       * Create billing portal to switch plans
       */
      const session = await stripe.billingPortal.sessions.create({
        customer: req.query["customerId"] as string,
        return_url: req.headers["referer"],
      })
      res.json({ url: session.url })
    } else {
      /**
       * Create checkout to create new plan
       */
      const priceId = req.query["priceId"] as string | undefined
      if (!priceId) {
        throw new HttpError(400, `priceId is missing in query`)
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        customer_update: {
          address: "auto",
        },
        payment_method_types: ["card"],
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        automatic_tax: { enabled: true },
        // consent_collection:{promotions: "auto"},
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        success_url: req.headers["referer"] ?? "https://perfol.io/dashboard",
        cancel_url: req.headers["referer"] ?? "https://perfol.io/dashboard",
      })
      if (checkoutSession.url) {
        res.json({ url: checkoutSession.url })
      }
    }
  } catch (err) {
    logger.error((err as Error).message)
    res.send((err as Error).message)
  } finally {
    res.end()
  }
}

export default handler

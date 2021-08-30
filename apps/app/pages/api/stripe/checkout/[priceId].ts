import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { Logger } from "tslog"
const validation = z.object({
  query: z.object({
    priceId: z.string(),
    customerId: z.string(),
  }),
  method: z.string().refine((m) => m === "POST"),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "checkout session" })
  try {
    const {
      query: { priceId, customerId },
    } = validation.parse(req)

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: req.headers["referer"] ?? "https://app.perfol.io",
      cancel_url: req.headers["referer"] ?? "https://app.perfol.io",
    })
    if (checkoutSession.url) {
      res.json({ url: checkoutSession.url })
    }
  } catch (err) {
    logger.error(err)
    res.send(err.message)
  } finally {
    res.end()
  }
}

export default handler

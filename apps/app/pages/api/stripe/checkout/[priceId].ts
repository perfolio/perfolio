import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { Logger } from "tslog"
const validation = z.object({
  headers: z.object({
    "content-type": z.string().refine((h) => h === "application/json"),
  }),
  query: z.object({
    priceId: z.string(),
  }),
  method: z.string().refine((m) => m === "POST"),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "checkout session" })
  try {
    logger.debug(typeof req.body, req.body, req.headers)
    const {
      query: { priceId },
    } = validation.parse(req)

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/payments/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000",
    })
    if (checkoutSession.url) {
      res.json({ checkoutUrl: checkoutSession.url })
    }
  } catch (err) {
    logger.error(err)
    res.send(err.message)
  } finally {
    res.end()
  }
}

export default handler

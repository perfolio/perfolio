import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"
import { Logger } from "tslog"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "checkout session" })
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }

  if (!req.query.customerId) {
    res.status(400)
    return res.end("customerId is missing in query")
  }

  try {
    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const session = await stripe.billingPortal.sessions.create({
      customer: req.query.customerId as string,
      return_url: req.headers["referer"],
    })
    res.json({ url: session.url })
  } catch (err) {
    logger.error(err)
    res.send(err.message)
  } finally {
    res.end()
  }
}

export default handler

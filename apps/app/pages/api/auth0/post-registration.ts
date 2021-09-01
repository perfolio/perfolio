/**
 * ----------------------------------------------------------------------------
 * If you change the path of this file you must also change the url in the
 * auth0 post-registration action
 * ----------------------------------------------------------------------------
 */

import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { Logger } from "tslog"
import { PrismaClient } from "@perfolio/integrations/prisma"

const validation = z.object({
  headers: z.object({
    "content-type": z.string().refine((h) => h === "application/json"),
    authorization: z.string().refine((h) => h === env.require("AUTH0_WEBHOOK_TOKEN")),
  }),
  body: z.object({
    userId: z.string(),
    email: z.string().email(),
  }),
  method: z.string().refine((m) => m === "POST"),
})

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "on login" })
  try {
    logger.debug(typeof req.body, req.body, req.headers)
    const {
      body: { userId, email },
    } = await validation.parseAsync(req)

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const customer = await stripe.customers.create({ email })

    await prisma.user.create({
      data: {
        id: userId,
        email,
        stripeCustomerId: customer.id,
      },
    })
    await stripe.subscriptions.create({
      customer: customer.id,
      trial_period_days: 7,
      items: [
        {
          // Pro subscription
          price: "price_1JU4LpG0ZLpKb1P6Szj2jJQr",
        },
      ],
    })
    res.json({ received: true })
  } catch (err) {
    res.status(500)
    res.send(err.message)
    logger.error(err)
  } finally {
    res.end()
  }
}

export default handler

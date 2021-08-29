import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { Logger } from "tslog"
import { PrismaClient } from "@perfolio/integrations/prisma"

const validation = z.object({
  headers: z.object({
    "content-type": z.string().refine((h) => h === "application/json"),
    authorization: z.string().refine((h) => h === env.require("AUTH0_HOOK_SECRET")),
  }),
  body: z.object({
    userId: z.string(),
    email: z.string().email(),
  }),
  method: z.string().refine((m) => m === "POST"),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "on sign in" })
  try {
    logger.debug(typeof req.body, req.body, req.headers)
    const {
      body: { userId, email },
    } = await validation.parseAsync(req).catch((err) => {
      res.status(400)
      throw err
    })

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const customer = await stripe.customers.create({ email })

    const prisma = new PrismaClient()

    await prisma.user.create({
      data: {
        id: userId,
        stripeCustomerId: customer.id,
      },
    })
  } catch (err) {
    logger.error(err)
  } finally {
    res.json({ received: true })
    res.end()
  }
}

export default handler

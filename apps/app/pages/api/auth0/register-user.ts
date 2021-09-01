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
import { HTTPError } from "@perfolio/util/errors"
import { ManagementClient } from "auth0"
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

const auth0 = new ManagementClient({
  domain: env.require("NEXT_PUBLIC_AUTH0_DOMAIN"),
  clientId: env.require("AUTH0_MANAGEMENT_CLIENT_ID"),
  clientSecret: env.require("AUTH0_MANAGEMENT_CLIENT_SECRET"),
})
const prisma = new PrismaClient()

/**
 * This webhook gets called by auth0 only on the first login of a user
 * It creates a new stripe customer, database entry and subscription.
 * And sets the access role in auth0
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "on registration" })
  try {
    logger.debug(typeof req.body, req.body, req.headers)
    const {
      body: { userId, email },
    } = await validation.parseAsync(req)

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const customer = await stripe.customers.create({ email }).catch((err) => {
      throw new HTTPError(500, `Unable to create customer in stripe ${email}: ${err}`)
    })

    const user = await prisma.user
      .create({
        data: {
          id: userId,
          email,
          stripeCustomerId: customer.id,
        },
      })
      .catch((err) => {
        throw new HTTPError(500, `Unable to create user in database: ${err}`)
      })

    await stripe.subscriptions
      .create({
        customer: user.stripeCustomerId,
        trial_period_days: 7,
        items: [
          {
            // Growth subscription
            price: "price_1JU4LpG0ZLpKb1P6Szj2jJQr",
          },
        ],
      })
      .catch((err) => {
        throw new HTTPError(500, `Unable to create subscription for user ${userId}: ${err}`)
      })

    const growthRole = "rol_Rjy99HLtin8ryEds"
    await auth0.assignRolestoUser({ id: user.id }, { roles: [growthRole] }).catch((err) => {
      throw new HTTPError(500, `Unable to assign role ${growthRole} to user ${user.id}: ${err}`)
    })

    res.json({ received: true })
  } catch (err) {
    res.status(err instanceof HTTPError ? err.status : 500)

    res.send(err.message)
    logger.error(err)
  } finally {
    res.end()
  }
}

export default handler

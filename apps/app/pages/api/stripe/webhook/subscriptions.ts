import { Stripe } from "stripe"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { Logger } from "tslog"
import { buffer } from "micro"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { ManagementClient } from "auth0"
import { HTTPError } from "@perfolio/util/errors"

const subscriptionValidation = z.object({
  id: z.string(),
  object: z.string().refine((object) => object === "subscription"),
  current_period_end: z.number().int(),
  current_period_start: z.number().int(),
  customer: z.string(),
  status: z.enum([
    "incomplete",
    "incomplete_expired",
    "trialing",
    "active",
    "past_due",
    "canceled",
    "unpaid",
  ]),
  items: z.object({
    data: z.array(
      z.object({
        price: z.object({
          product: z.string(),
        }),
      }),
    ),
  }),
})

const requestValidation = z.object({
  method: z.string().refine((m) => m === "POST"),
  headers: z.object({
    "stripe-signature": z.string(),
  }),
})

const prisma = new PrismaClient()

const auth0 = new ManagementClient({
  domain: env.require("NEXT_PUBLIC_AUTH0_DOMAIN"),
  clientId: env.require("AUTH0_MANAGEMENT_CLIENT_ID"),
  clientSecret: env.require("AUTH0_MANAGEMENT_CLIENT_SECRET"),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logger = new Logger({ name: "Stripe Webhook" })
  try {
    const {
      headers: { "stripe-signature": signature },
    } = requestValidation.parse(req)

    const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
      apiVersion: "2020-08-27",
      typescript: true,
    })

    const event = stripe.webhooks.constructEvent(
      (await buffer(req)).toString(),
      signature,
      env.require("STRIPE_WEBHOOK_SECRET"),
    )

    if (!event.type.startsWith("customer.subscription")) {
      return res.send(`Wrong webhook, this webhook only handles customer.subscription events`)
    }
    logger.debug("event", event.type)
    const subscription = subscriptionValidation.parse(event.data.object)

    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: subscription.customer },
    })
    if (!user) {
      throw new Error(`User not found: ${{ stripeCustomerId: subscription.customer }}`)
    }
    logger.debug("Found user", user)

    const product = await stripe.products
      .retrieve(subscription.items.data[0].price.product)
      .catch((err) => {
        logger.error(err)
        throw new HTTPError(500, `Product could not be found`)
      })
    logger.debug({ product })

    const role = product.metadata["authRole"] as string | undefined
    if (!role) {
      throw new Error(`Product ${product.name} is missing the "authRole" metadata`)
    }
    logger.debug(await auth0.getUsers())

    logger.debug(await auth0.getUsers())

    switch (event.type) {
      case "customer.subscription.created":
        await auth0.assignRolestoUser({ id: user.id }, { roles: [role] }).catch((err) => {
          throw new HTTPError(500, `Unable to assign role ${role} to user ${user.id}: ${err}`)
        })
        break

      case "customer.subscription.updated":
        await auth0.assignRolestoUser({ id: user.id }, { roles: [role] }).catch((err) => {
          throw new HTTPError(500, `Unable to assign role ${role} to user ${user.id}: ${err}`)
        })
        break

      case "customer.subscription.deleted":
        await auth0.removeRolesFromUser({ id: user.id }, { roles: [role] }).catch((err) => {
          throw new HTTPError(500, `Unable to remove role ${role} from user ${user.id}: ${err}`)
        })
        break

      case "customer.subscription.trial_will_end":
        await prisma.notification.create({
          data: {
            userId: user.id,
            message: "Your trial will end soon",
          },
        })
        break
      default:
        break
    }
  } catch (err) {
    logger.error({ error: err.message })

    res.status(err instanceof HTTPError ? err.status : 500)
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

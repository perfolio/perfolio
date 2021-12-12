import { env } from "@chronark/env"
import { Role } from "@perfolio/pkg/auth"
import { PrismaClient } from "@perfolio/pkg/integrations/prisma"
import { Logger } from "@perfolio/pkg/logger"
import { HttpError } from "@perfolio/pkg/util/errors"
import { buffer } from "micro"
import { NextApiRequest, NextApiResponse } from "next"
import { Stripe } from "stripe"
import { z } from "zod"

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

async function addRole(prisma: PrismaClient, userId: string, role: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { roles: true } })
  if (!user) {
    throw new Error("Unable to load user)")
  }

  if (user.roles.map((r) => r.name).includes(role)) {
    return
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      roles: {
        connect: {
          name: role,
        },
      },
    },
  })
}

async function removeRole(prisma: PrismaClient, userId: string, role: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { roles: true } })
  if (!user) {
    throw new Error("Unable to load user)")
  }

  if (!user.roles.map((r) => r.name).includes(role)) {
    return
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      roles: {
        disconnect: {
          name: role,
        },
      },
    },
  })
}

const prisma = new PrismaClient()

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
    const subscription = subscriptionValidation.parse(event.data.object)

    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: subscription.customer },
    })

    if (!user) {
      throw new Error(
        `User not found: ${JSON.stringify({
          stripeCustomerId: subscription.customer,
        })}`,
      )
    }

    const product = await stripe.products
      .retrieve(subscription.items.data[0].price.product)
      .catch((err) => {
        throw new HttpError(500, `Product could not be found: ${err}`)
      })

    const authRoles: {
      [productId: string]: Role
    } = {
      [env.require("STRIPE_PRODUCT_GROWTH")]: "subscription:growth",
    }
    /**
     * New access role for the new subscribed plan
     */
    const authRole = authRoles[product.id]
    if (!authRole) {
      throw new Error(`Product ${product.name} is not associated with a role`)
    }

    /**
     * Act on the different types of events
     */
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await addRole(prisma, user.id, authRole)
        break
      case "customer.subscription.deleted":
        await removeRole(prisma, user.id, authRole)
        break
      // case "customer.subscription.trial_will_end":
      // break
      default:
        break
    }
  } catch (error) {
    const err = error as Error
    logger.error("Error", { error: err.message })

    res.status(err instanceof HttpError ? err.status : 500)
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

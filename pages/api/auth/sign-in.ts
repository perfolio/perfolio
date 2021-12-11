import { PrismaClient, UserModel } from "@perfolio/pkg/integrations/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { AuthCookie } from "pkg/auth"
import { env } from "@chronark/env"
import { Magic } from "@magic-sdk/admin"
import { Logger } from "pkg/logger"
import { Stripe } from "stripe"
import { HttpError } from "@perfolio/pkg/util/errors"
import { newId } from "@perfolio/pkg/id"

export default async function signin(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }
  const logger = new Logger({ name: "/api/auth/sign-in" })
  try {
    const prisma = new PrismaClient()
    const didToken = req.headers.authorization?.substr(7)
    if (!didToken) {
      throw new Error("Authorization Token undefined")
    }
    const magic = new Magic(env.require("MAGIC_SECRET_KEY"))
    magic.token.validate(didToken)
    new AuthCookie(req, res).set(didToken)
    const meta = await magic.users.getMetadataByToken(didToken)

    if (!meta.publicAddress) {
      throw new Error("public address is null")
    }
    if (!meta.email) {
      throw new Error("email address is null")
    }
    let user: UserModel | null
    user = await prisma.user.findUnique({
      where: {
        id: meta.publicAddress,
      },
    })
    if (!user) {
      const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
        apiVersion: "2020-08-27",
        typescript: true,
      })

      console.log({ meta })

      const customer = await stripe.customers.create({
        email: meta.email,
      })
      const subscription = await stripe.subscriptions
        .create({
          customer: customer.id,
          trial_period_days: 7,
          items: [
            {
              plan: env.require("STRIPE_PRICE_GROWTH_MONTHLY"),
            },
          ],
        })
        .catch((err) => {
          throw new HttpError(500, `Unable to create subscription for user ${meta.email}: ${err}`)
        })

      user = await prisma.user.upsert({
        where: { id: meta.publicAddress },
        update: {},
        create: {
          id: newId("user"),
          publicAddress: meta.publicAddress,
          stripeCustomerId: customer.id,
          stripeSubscriptionId: subscription.id,
          currentPaymentPeriodStart: new Date(subscription.current_period_start*1000),
          currentPaymentPeriodEnd: new Date(subscription.current_period_end*1000),
          portfolios: {
            create: [
              {
                id: newId("portfolio"),
                name: "My Portfolio",
                primary: true,
              },
            ],
          },
          settings: {
            connectOrCreate: {
              where: {
                userId: meta.publicAddress,
              },
              create: {
                defaultCurrency: "EUR",
                defaultExchangeId: "xetr",
              },
            },
          },
        },
      })
    }

    res.send({ user })
  } catch (err) {
    logger.error("Fatal error", { err: err as Error })
    res.status(500)
  } finally {
    res.end()
  }
}

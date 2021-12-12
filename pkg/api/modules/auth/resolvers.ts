import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"

import { UserModel } from "@perfolio/pkg/integrations/prisma"
import { Stripe } from "stripe"
import { HttpError } from "@perfolio/pkg/util/errors"
import { newId } from "@perfolio/pkg/id"
import { JWT } from "pkg/auth"
import { Magic } from "@magic-sdk/admin"
import { env } from "@chronark/env"
import { Role } from "@perfolio/pkg/auth/roles"

export const resolvers: Resolvers<Context> = {
  Mutation: {
    signIn: async (_root, { didToken }, ctx) => {
      const magic = new Magic(env.require("MAGIC_SECRET_KEY"))

      magic.token.validate(didToken)
      const [, { iss: magicId }] = magic.token.decode(didToken)
      const { email } = await magic.users.getMetadataByToken(didToken)

      if (!email) {
        throw new Error("email address is null")
      }
      let user: UserModel | null
      user = await ctx.dataSources.db.user.findUnique({
        where: {
          magicId,
        },
      })
      if (!user) {
        const stripe = new Stripe(env.require("STRIPE_SECRET_KEY"), {
          apiVersion: "2020-08-27",
          typescript: true,
        })

        const customer = await stripe.customers.create({
          email,
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
            throw new HttpError(500, `Unable to create subscription for user ${email}: ${err}`)
          })

        user = await ctx.dataSources.db.user.upsert({
          where: { magicId },
          update: {},
          create: {
            id: newId("user"),
            magicId,
            stripeCustomerId: customer.id,
            stripeSubscriptionId: subscription.id,
            currentPaymentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPaymentPeriodEnd: new Date(subscription.current_period_end * 1000),
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
              create: {
                defaultCurrency: "EUR",
                defaultExchangeId: "xetr",
              },
            },
            roles: {
              connectOrCreate: {
                where: {
                  name: "subscription:growth",
                },
                create: {
                  id: newId("role"),
                  name: "subscription:growth",
                  description: "All users with the growth subscription",
                },
              },
            },
          },
        })
      }
      return true
    },
    refresh: async (_root, { didToken }, ctx) => {
      const magic = new Magic(env.require("MAGIC_SECRET_KEY"))
      magic.token.validate(didToken)

      const [, { iss: magicId }] = magic.token.decode(didToken)

      const user = await ctx.dataSources.db.user.findUnique({
        where: { magicId },
        include: { roles: true },
      })
      if (!user) {
        throw new HttpError(500, `No user found with magicId: ${magicId}`)
      }

      return JWT.sign(user.id, { roles: user.roles.map((r) => r.name as Role) })
    },
  },
}

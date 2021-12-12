import { AuthorizationError } from "@perfolio/pkg/util/errors"
import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  User: {
    settings: async (user, _args, ctx) => {
      ctx.authorizeUser(["read:user", "read:settings"], (claims) => {
        if (claims.sub !== user.id) {
          throw new AuthorizationError("Not allowed to access settings")
        }
      })
      const settings = await ctx.dataSources.db.settings.findUnique({
        where: { userId: user.id },
      })
      if (!settings) {
        throw new Error(`The user ${user.id} has no settings`)
      }
      return settings
    },
  },
  Settings: {
    defaultExchange: async (settings, _args, ctx) => {
      ctx.authorizeUser(["read:user", "read:settings", "read:exchange"], (claims) => {
        if (claims.sub !== settings.userId) {
          throw new AuthorizationError("Not allowed to access settings")
        }
      })
      const allExchanges = await ctx.dataSources.iex.getExchanges()
      const exchange = allExchanges.find(
        (exchange) => exchange.mic.toLowerCase() === settings.defaultExchangeId.toLowerCase(),
      )

      if (!exchange) {
        throw new Error(`The user ${settings.userId} has no valid default exchange`)
      }
      return exchange
    },
  },

  Mutation: {
    updateSettings: async (_root, { settings }, ctx) => {
      ctx.authorizeUser(["read:user", "update:settings"], (claims) => {
        if (claims.sub !== settings.userId) {
          throw new AuthorizationError("Not allowed to access settings")
        }
      })
      return await ctx.dataSources.db.settings.update({
        where: { userId: settings.userId },
        data: {
          ...settings,
        },
      })
    },
  },
}

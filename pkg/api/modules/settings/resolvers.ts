import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  User: {
    settings: async (user, _args, ctx) => {
      ctx.authorizeUser((claims) => claims.sub === user.id)
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
      ctx.authorizeUser((claims) => claims.sub === settings.userId)
      const allExchanges = await ctx.dataSources.iex.getExchanges()
      const exchange = allExchanges.find(
        (exchange) =>
          exchange.mic.toLowerCase()
            === settings.defaultExchangeId.toLowerCase(),
      )

      if (!exchange) {
        throw new Error(
          `The user ${settings.userId} has no valid default exchange`,
        )
      }
      return exchange
    },
  },

  Mutation: {
    updateSettings: async (_root, { settings }, ctx) => {
      await ctx.authorizeUser((claims) => claims.sub === settings.userId)
      return await ctx.dataSources.db.settings.update({
        where: { userId: settings.userId },
        data: {
          ...settings,
        },
      })
    },
  },
}

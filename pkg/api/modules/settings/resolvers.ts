import { Context, } from "../../context"
import { Resolvers, } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  User: {
    settings: async (user, _args, ctx,) => {
      ctx.authorizeUser((claims,) => claims.sub === user.id)
      const settings = await ctx.dataSources.db.settings.findUnique({
        where: { userId: user.id, },
      },)
      if (!settings) {
        throw new Error(`The user ${user.id} has no settings`,)
      }
      return settings
    },
  },
  Settings: {
    defaultExchange: async (settings, _args, ctx,) => {
      ctx.authorizeUser((claims,) => claims.sub === settings.userId)
      const exchange = await ctx.dataSources.iex.getExchange({
        mic: settings.defaultExchangeMic,
      },)
      if (!exchange) {
        throw new Error(
          `The user ${settings.userId} has no valid default exchange`,
        )
      }
      return exchange
    },
  },
}

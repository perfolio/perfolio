import { Context } from "../../context"
import { Resolvers } from "../../generated/schema-types"
import { Exchange } from "../../generated/schema-types"

export const resolvers: Resolvers<Context> = {
  Query: {
    exchanges: async (_root, _args, ctx) => {
      const key = ctx.cache.key("Exchanges")
      // const cachedValue = await ctx.cache.get<Exchange[]>(key)
      // if (cachedValue) {
      // return cachedValue
      // }
      const exchanges = await ctx.dataSources.iex.getExchanges()
      const value = exchanges.filter(exchange => exchange.region.toUpperCase() === "DE")
      // await ctx.cache.set("24h", { key, value })
      return value
    },
  },
}

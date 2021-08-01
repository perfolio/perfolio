import { ExchangeTradedAsset, ResolverFn } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../../context"

export const currentValue: ResolverFn<number, ExchangeTradedAsset, Context, unknown> = async (
  { ticker },
  _args,
  ctx,
  { path },
) => {
  ctx.authenticateUser()

  const key = new Key({ path, ticker })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<number>(key)
  if (cachedValue) {
    return cachedValue
  }

  const value = await ctx.dataSources.iex.getCurrentPrice({ ticker })
  await cache.set("1h", { key, value })
  return value
}

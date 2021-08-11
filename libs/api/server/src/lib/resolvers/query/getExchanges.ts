import { Exchange, ResolverFn } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../../context"

type R = Exchange[]
type P = unknown
type C = Context
type A = unknown

export const getExchanges: ResolverFn<R, P, C, A> = async (_parent, _args, ctx, { path }) => {
  await ctx.authenticateUser()

  const key = new Key({ path })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<R>(key)
  if (cachedValue) {
    return cachedValue
  }

  const value = await ctx.dataSources.iex.getExchanges()
  await cache.set("30d", { key, value })
  return value
}

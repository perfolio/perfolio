import { Exchange, ResolverFn } from "@perfolio/pkg/api/graphql"
import { ApolloCache, Key } from "@perfolio/pkg/integrations/redis"
import { Context } from "../../context"

type R = Exchange[]
type P = unknown
type C = Context
type A = unknown

export const exchanges: ResolverFn<R, P, C, A> = async (_parent, _args, ctx, { path }) => {
  await ctx.authenticateUser()

  const key = new Key(path.typename, path.key)
  const cache = new ApolloCache()

  const cachedValue = await cache.get<R>(key)
  if (cachedValue) {
    return cachedValue
  }

  const value = await ctx.dataSources.iex.getExchanges()
  await cache.set("30d", { key, value })
  return value
}

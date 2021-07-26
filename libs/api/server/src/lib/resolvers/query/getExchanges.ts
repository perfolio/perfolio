import { Exchange, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { cachedResolver } from "@perfolio/integrations/redis"

type R = Exchange[]
type P = unknown
type C = Context
type A = unknown

export const getExchanges: ResolverFn<R, P, C, A> = async (parent, args, ctx, info) => {
  ctx.authenticateUser()

  return cachedResolver<R, P, C, A>("5m", async (_parent, _args, ctx, _info) => {
    return await ctx.dataSources.iex.getExchanges()
  })(parent, args, ctx, info)
}

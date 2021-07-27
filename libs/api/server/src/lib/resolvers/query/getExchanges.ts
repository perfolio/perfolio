import { Exchange, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

type R = Exchange[]
type P = unknown
type C = Context
type A = unknown

export const getExchanges: ResolverFn<R, P, C, A> = async (_parent, _args, ctx, _info) => {
  ctx.authenticateUser()

  return await ctx.dataSources.iex.getExchanges()
}

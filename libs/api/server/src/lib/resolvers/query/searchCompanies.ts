import { ResolverFn, Company } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { cachedResolver } from "@perfolio/integrations/redis"

type R = Company[]
type P = unknown
type C = Context
type A = { fragment: string }

export const searchCompanies: ResolverFn<R, P, C, A> = async (parent, args, ctx, info) => {
  ctx.authenticateUser()

  return cachedResolver<R, P, C, A>("5m", async (_parent, args, ctx, _info) => {
    const fragment = args.fragment.toLowerCase()
    return await ctx.dataSources.iex.search({ fragment })
  })(parent, args, ctx, info)
}

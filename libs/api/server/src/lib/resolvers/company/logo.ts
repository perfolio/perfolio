import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { convertTime } from "@perfolio/util/time"
import { CacheScope } from "apollo-server-types"

export const logo: ResolverFn<string, Company, Context, unknown> = async (
  company,
  _args,
  ctx,
  { cacheControl },
) => {
  ctx.authenticateUser()

  cacheControl.setCacheHint({ maxAge: convertTime("1d"), scope: CacheScope.Public })
  return await ctx.dataSources.iex.getLogo(company.ticker)
}

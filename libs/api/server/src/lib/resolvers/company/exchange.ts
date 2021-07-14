import { Company, Exchange, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { convertTime } from "@perfolio/util/time"
import { CacheScope } from "apollo-server-types"

export const exchange: ResolverFn<Exchange | null, Company, Context, unknown> = async (
  company,
  _args,
  ctx,
  { cacheControl },
) => {
  ctx.authenticateUser()

  cacheControl.setCacheHint({ maxAge: convertTime("1d"), scope: CacheScope.Public })

  const allExchanges = await ctx.dataSources.iex.getExchanges()
  const exchange = allExchanges.find((e) =>
    company.ticker.toLowerCase().endsWith(e.suffix.toLowerCase()),
  )
  return exchange!
}

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
  const allTicker = await ctx.dataSources.iex.getTickers()
  const ticker = allTicker.find((s) => s.ticker === company.ticker)
  if (!ticker?.exchangeMic) {
    return null
  }
  return await ctx.dataSources.iex.getExchange({ mic: ticker.exchangeMic })
}

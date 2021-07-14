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
  const symbols = await ctx.dataSources.iex.getSymbols()
  const symbol = symbols.find((s) => s.symbol === company.ticker)
  if (!symbol?.exchangeMic) {
    return null
  }
  return await ctx.dataSources.iex.getExchange({ mic: symbol.exchangeMic })
}

import { Ticker, Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { convertTime } from "@perfolio/util/time"
import { CacheScope } from "apollo-server-types"

export const company: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  Ticker,
  Context,
  void
> = async ({ ticker }, _args, ctx, { cacheControl }) => {
  ctx.authenticateUser()

  cacheControl.setCacheHint({ maxAge: convertTime("1d"), scope: CacheScope.Public })
  return await ctx.dataSources.iex.getCompany(ticker)
}

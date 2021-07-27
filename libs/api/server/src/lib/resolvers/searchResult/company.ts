import { Company, ResolverFn, SearchResult } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { cachedResolver } from "@perfolio/integrations/redis"

const resolver: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  SearchResult,
  Context,
  unknown
> = async ({ ticker }, _args, ctx, _info) => {
  ctx.authenticateUser()

  return await ctx.dataSources.iex.getCompany(ticker)
}
export const company = cachedResolver("5m", resolver)

import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { cachedResolver } from "@perfolio/integrations/redis"

const resolver: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  void,
  Context,
  { ticker: string }
> = async (_parent, { ticker }, ctx, _info) => {
  ctx.authenticateUser()
  return await ctx.dataSources.iex.getCompany(ticker)
}

export const getCompany = cachedResolver("5m", resolver)

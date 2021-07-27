import { Company, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { cachedResolver } from "@perfolio/integrations/redis"

const resolver: ResolverFn<
  Omit<Company, "logo" | "currentValue" | "exchange"> | null,
  void,
  Context,
  { isin: string }
> = async (_parent, { isin }, ctx, _info) => {
  ctx.authenticateUser()

  const isinMap = await ctx.dataSources.iex.getIsinMapping({ isin })
  ctx.logger.debug({ isinMap })
  const ticker = isinMap.find((i) => !i.symbol.includes("-"))?.symbol
  if (!ticker) {
    throw new Error(`No main ticker found for isin: ${isin}`)
  }

  return await ctx.dataSources.iex.getCompany(ticker)
}

export const getCompanyFromIsin = cachedResolver("5m", resolver)

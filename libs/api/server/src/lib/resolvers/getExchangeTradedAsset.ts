import { ExchangeTradedAsset } from "@perfolio/api/graphql"
import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { Context } from "../context"

export const getExchangeTradedAsset = async (
  ctx: Context,
  id: string,
): Promise<ExchangeTradedAsset> => {
  ctx.authenticateUser()

  const key = new Key({ resolver: "getExchangeTradedAsset", id })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<ExchangeTradedAsset>(key)
  if (cachedValue) {
    return cachedValue
  }

  const company = await ctx.dataSources.iex.getCompanyFromIsin(id)
  if (!company) {
    throw new Error(`No company found for isin: ${id}`)
  }
  const logo = await ctx.dataSources.iex.getLogo(company.ticker)
  const value = {
    id,
    ticker: company.ticker,
    name: company.name,
    logo,
  }
  await cache.set("1h", { key, value })
  return value
}
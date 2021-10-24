import { ApolloCache, Key } from "@perfolio/integrations/redis"

import { Context } from "../context"
import { ExchangeTradedAsset } from "@perfolio/api/graphql"
import { getTickerFromIsin } from "./getTickerFromIsin"

export const getExchangeTradedAsset = async (
  ctx: Context,
  id: string,
): Promise<ExchangeTradedAsset> => {
  const key = new Key({ resolver: getExchangeTradedAsset, id })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<ExchangeTradedAsset>(key)
  if (cachedValue) {
    return cachedValue
  }

  const ticker = await getTickerFromIsin(ctx, id)
  const company = await ctx.dataSources.iex.getCompany(ticker)
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

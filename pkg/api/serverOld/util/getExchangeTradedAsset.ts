import { ApolloCache, Key, } from "@perfolio/pkg/integrations/redis"

import { Company, Crypto, } from "@perfolio/pkg/api"
import { Context, } from "../context"
import { getTickerFromIsin, } from "./getTickerFromIsin"

export const getExchangeTradedAsset = async (
  ctx: Context,
  id: string,
): Promise<Company | Crypto> => {
  const key = new Key({ resolver: getExchangeTradedAsset, id, },)
  const cache = new ApolloCache()

  const cachedValue = await cache.get<Company | Crypto>(key,)
  if (cachedValue) {
    return cachedValue
  }

  const ticker = await getTickerFromIsin(ctx, id,)
  const company = await ctx.dataSources.iex.getCompany(ticker,)
  if (!company) {
    throw new Error(`No company found for isin: ${id}`,)
  }
  const logo = await ctx.dataSources.iex.getLogo(company.ticker,)
  const value: Company | Crypto = {
    id,
    ticker: company.ticker,
    name: company.name,
    logo,
    sector: company.sector,
    country: company.country,
  }
  await cache.set("1h", { key, value, },)
  return value
}

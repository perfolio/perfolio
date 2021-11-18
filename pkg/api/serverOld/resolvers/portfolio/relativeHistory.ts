import { rebalance, toTimeseries, } from "@perfolio/pkg/finance/returns"
import { ApolloCache, Key, } from "@perfolio/pkg/integrations/redis"

import { ValueAtTime, } from "@perfolio/pkg/api/graphql"
import { Context, } from "../../context"
import { getAbsolutePortfolioHistory, } from "./absoluteHistory"

export const getRelativePortfolioHistory = async (
  ctx: Context,
  portfolioId: string,
  since?: number,
): Promise<ValueAtTime[]> => {
  const assetHistory = await getAbsolutePortfolioHistory(ctx, portfolioId,)

  const key = new Key({
    resolver: "getRelativePortfolioHistory",
    assetHistory,
    since,
  },)
  const cache = new ApolloCache()

  const cachedValue = await cache.get<ValueAtTime[]>(key,)
  if (cachedValue) {
    return cachedValue
  }
  const series = toTimeseries(assetHistory, since,)
  const index = rebalance(series,)
  const value = Object.entries(index,)
    .map(([time, value,],) => ({
      time: Number(time,),
      value,
    }))
    .filter(({ value, },) => !Number.isNaN(value,))
  await cache.set("1h", { key, value, },)
  return value
}

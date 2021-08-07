import { ValueAtTime } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { AuthorizationError } from "@perfolio/util/errors"
import { getPortfolioHistory } from "./getPortfolioHistory"
import { rebalance, toTimeseries } from "@perfolio/feature/finance/returns"
import { ApolloCache, Key } from "@perfolio/integrations/redis"

export const getRelativePortfolioHistory = async (
  ctx: Context,
  userId: string,
  since?: number,
): Promise<ValueAtTime[]> => {
  const { sub } = await ctx.authenticateUser()
  if (sub !== userId) {
    throw new AuthorizationError("getRelativePortfolioHistory", "userId does not match")
  }
  const assetHistory = await getPortfolioHistory(ctx, userId)
  const key = new Key({ v: 2, resolver: "getRelativePortfolioHistory", assetHistory, since })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<ValueAtTime[]>(key)
  if (cachedValue) {
    return cachedValue
  }
  const series = toTimeseries(assetHistory, since)
  const index = rebalance(series)
  const value = Object.entries(index)
    .map(([time, value]) => ({
      time: Number(time),
      value,
    }))
    .filter(({ value }) => !Number.isNaN(value))
  await cache.set("1h", { key, value })
  return value
}

import { ValueAtTime } from "@perfolio/api/graphql"
import { Context } from "../../context"
import { AuthorizationError } from "@perfolio/util/errors"
import { getPortfolioHistory } from "./getPortfolioHistory"
import { rebalance, toTimeseries } from "@perfolio/feature/finance/returns"
import { ApolloCache, Key } from "@perfolio/integrations/redis"

export const getRelativePortfolioHistory = async (
  ctx: Context,
  userId: string,
): Promise<ValueAtTime[]> => {
  const { sub } = ctx.authenticateUser()
  if (sub !== userId) {
    throw new AuthorizationError("getRelativePortfolioHistory", "userId does not match")
  }
  const assetHistory = await getPortfolioHistory(ctx, userId)
  const key = new Key({ resolver: "getRelativePortfolioHistory", assetHistory })
  const cache = new ApolloCache()

  const cachedValue = await cache.get<ValueAtTime[]>(key)
  if (cachedValue) {
    return cachedValue
  }
  const series = toTimeseries(assetHistory)
  const index = rebalance(series)
  const value = Object.entries(index).map(([time, value]) => ({
    time: Number(time),
    value,
  }))

  await cache.set("1h", { key, value })
  return value
}

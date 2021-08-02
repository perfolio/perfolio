import { useQuery } from "react-query"
export const USE_ABSOLUTE_PORTFOLIO_HISTORY = "USE_ABSOLUTE_PORTFOLIO_HISTORY"
import { toTimeseries } from "@perfolio/feature/finance/returns"
import { AssetHistory } from "@perfolio/api/graphql"

export const useAbsolutePortfolioHistory = (
  portfolioHistory: Omit<AssetHistory, "asset">[],
  since = Number.NEGATIVE_INFINITY,
) => {
  const { data, ...meta } = useQuery([USE_ABSOLUTE_PORTFOLIO_HISTORY, { portfolioHistory }], () => {
    const series = toTimeseries(portfolioHistory)
    return Object.entries(series)
      .map(([time, assets]) => ({
        time: Number(time),
        value: Object.values(assets)
          .map((asset) => asset.quantity * asset.value)
          .reduce((acc, val) => acc + val),
      }))
      .filter(({ time }) => time >= since)
  })

  return { absolutePortfolioHistory: data ?? [], ...meta }
}

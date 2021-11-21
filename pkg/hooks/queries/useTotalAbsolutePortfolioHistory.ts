import { useQuery } from "react-query"
export const USE_AGGREGATED_ABSOLUTE_PORTFOLIO_HISTORY = "USE_AGGREGATED_ABSOLUTE_PORTFOLIO_HISTORY"
import { AbsoluteAssetHistory } from "@perfolio/pkg/api"
import { toTimeseries } from "@perfolio/pkg/finance/returns"

export const useTotalAbsolutePortfolioHistory = (
  portfolioHistory?: AbsoluteAssetHistory[] | null,
  since = Number.NEGATIVE_INFINITY,
) => {
  const { data, ...meta } = useQuery(
    [USE_AGGREGATED_ABSOLUTE_PORTFOLIO_HISTORY, { portfolioHistory }],
    () => {
      const series = toTimeseries(portfolioHistory!)
      return Object.entries(series)
        .map(([time, assets]) => ({
          time: Number(time),
          value: Object.values(assets)
            .map((asset) => asset.quantity * asset.value)
            .reduce((acc, val) => acc + val),
        }))
        .filter(({ time }) => time >= since)
    },
    { enabled: !!portfolioHistory },
  )

  return { totalAbsolutePortfolioHistory: data ?? [], ...meta }
}

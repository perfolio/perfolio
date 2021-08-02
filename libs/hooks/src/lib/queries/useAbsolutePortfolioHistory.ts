import { useQuery } from "react-query"
import { usePortfolioHistory } from "./usePortfolioHistory"
export const USE_ABSOLUTE_PORTFOLIO_HISTORY = "USE_ABSOLUTE_PORTFOLIO_HISTORY"
import { toTimeseries } from "@perfolio/feature/finance/returns"

export const useAbsolutePortfolioHistory = () => {
  const { portfolioHistory, ...meta } = usePortfolioHistory()
  const { data } = useQuery([USE_ABSOLUTE_PORTFOLIO_HISTORY, { portfolioHistory }], () => {
    const series = toTimeseries(portfolioHistory)
    return Object.entries(series).map(([time, assets]) => ({
      time: Number(time),
      value: Object.values(assets)
        .map((asset) => asset.quantity * asset.value)
        .reduce((acc, val) => acc + val),
    }))
  })

  return { absolutePortfolioHistory: data ?? [], ...meta }
}

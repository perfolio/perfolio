import { useQuery } from "react-query"
import { usePortfolioHistory } from "./usePortfolioHistory"
import { AssetsOverTime, toTimeseries } from "@perfolio/feature/finance/returns"

export const USE_PORTFOLIO_HISTORY_RANGE = "USE_PORTFOLIO_HISTORY_RANGE"

/**
 *
 * @param begin - Unix timestamp with second precision
 * @returns
 */
export const usePortfolioHistoryRange = (begin: number) => {
  const { portfolioHistory, ...meta } = usePortfolioHistory()
  const { data } = useQuery([USE_PORTFOLIO_HISTORY_RANGE, { begin }], () => {
    const series = toTimeseries(portfolioHistory)
    const selectedHistory: AssetsOverTime = {}
    Object.keys(series).forEach((time) => {
      if (Number(time) >= begin) {
        selectedHistory[Number(time)] = series[Number(time)]
      }
    })
    return selectedHistory
  })

  return { portfolioHistoryRange: data ?? [], ...meta }
}

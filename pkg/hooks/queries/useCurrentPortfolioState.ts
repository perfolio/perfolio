import { usePortfolioHistory } from "./usePortfolioHistory"
import { ValueAndQuantityAtTime } from "@perfolio/pkg/api/graphql"

export const useCurrentPorfolioState = () => {
  const { portfolioHistory, ...meta } = usePortfolioHistory()
  const getLastValid = (history: ValueAndQuantityAtTime[]): { quantity: number; value: number } => {
    const sorted = [...history].sort((a, b) => b.time - a.time)
    for (const day of sorted) {
      if (day.value > 0) {
        return day
      }
    }
    throw new Error("Nothing found")
  }
  const currentPorfolioState = portfolioHistory?.map((h) => {
    return {
      asset: h.asset,
      ...getLastValid(h.history),
    }
  })
  return { currentPorfolioState, ...meta }
}

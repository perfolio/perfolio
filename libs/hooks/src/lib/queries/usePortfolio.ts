import { ValueAndQuantityAtTime } from "@perfolio/api/graphql"
import { usePortfolioHistory } from "./usePortfolioHistory"
export const usePortfolio = () => {
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

  const portfolio = portfolioHistory?.map((h) => {
    return {
      asset: h.asset,
      ...getLastValid(h.history),
    }
  })

  return { portfolio, ...meta }
}

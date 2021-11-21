import { ValueAndQuantityAtTime } from "@perfolio/pkg/api"
import { usePortfolio } from "./usePortfolio"

export const useCurrentPorfolioState = () => {
  const { portfolio, ...meta } = usePortfolio()
  const getLastValid = (
    history: ValueAndQuantityAtTime[],
  ): { quantity: number; value?: number | null } => {
    const sorted = [...history].sort((a, b) => b.time - a.time)
    for (const day of sorted) {
      if (day.value) {
        return day
      }
    }
    throw new Error("Nothing found")
  }
  const currentPorfolioState = portfolio?.absoluteHistory?.map((h) => {
    return {
      asset: h.asset,
      ...getLastValid(h.history),
    }
  })
  return { currentPorfolioState, ...meta }
}

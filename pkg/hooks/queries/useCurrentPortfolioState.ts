import { ValueAndQuantityAtTime } from "@perfolio/pkg/api"
import { usePortfolioHistory } from ".."

export const useCurrentPorfolioState = () => {
  const { history, ...meta } = usePortfolioHistory()
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
  console.log({ history })
  const currentPorfolioState = history.absolute.map((h) => {
    return {
      asset: h.asset,
      ...getLastValid(h.history),
    }
  })
  return { currentPorfolioState, ...meta }
}

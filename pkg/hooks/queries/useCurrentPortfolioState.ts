import { ValueAndQuantityAtTime } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { usePortfolioHistory } from ".."

export const useCurrentPorfolioState = (opts?: { portfolioId?: string; since?: number }) => {
  const router = useRouter()
  const portfolioIdToUse = opts?.portfolioId ?? (router.query["portfolioId"] as string)
  const { history, ...meta } = usePortfolioHistory({ portfolioId: portfolioIdToUse })
  const getLastValid = (history: ValueAndQuantityAtTime[]): { quantity: number; value: number } => {
    const sorted = [...history].sort((a, b) => b.time - a.time)
    for (const day of sorted) {
      if (day.value >= 0) {
        return day
      }
    }
    throw new Error("Nothing found")
  }
  const currentPorfolioState = history.absolute.map((h) => {
    return {
      asset: h.asset,
      ...getLastValid(h.history),
    }
  })
  return { currentPorfolioState, ...meta }
}

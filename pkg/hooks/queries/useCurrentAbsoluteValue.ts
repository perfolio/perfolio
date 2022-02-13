import { useRouter } from "next/router"
import { useCurrentPorfolioState } from "./useCurrentPortfolioState"

export const useCurrentAbsoluteValue = (opts?: { portfolioId?: string; since?: number }) => {
  const router = useRouter()
  const portfolioIdToUse = opts?.portfolioId ?? (router.query["portfolioId"] as string)
  const { currentPorfolioState, ...meta } = useCurrentPorfolioState({
    portfolioId: portfolioIdToUse,
  })
  let currentAbsoluteValue = 0
  if (currentPorfolioState) {
    Object.values(currentPorfolioState).forEach((e) => {
      currentAbsoluteValue += e.quantity * e.value
    })
  }

  return { currentAbsoluteValue, ...meta }
}

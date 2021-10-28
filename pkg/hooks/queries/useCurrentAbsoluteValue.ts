import { useCurrentPorfolioState } from "./useCurrentPortfolioState"

export const useCurrentAbsoluteValue = () => {
  const { currentPorfolioState, ...meta } = useCurrentPorfolioState()
  let currentAbsoluteValue = 0
  if (currentPorfolioState) {
    Object.values(currentPorfolioState).forEach((e) => {
      currentAbsoluteValue += e.quantity * e.value
    })
  }

  return { currentAbsoluteValue, ...meta }
}

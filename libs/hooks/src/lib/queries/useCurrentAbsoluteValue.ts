import { usePortfolio } from "./usePortfolio"

export const useCurrentAbsoluteValue = () => {
  const { portfolio, ...meta } = usePortfolio()
  let currentAbsoluteValue = 0
  if (portfolio) {
    Object.values(portfolio).forEach((e) => {
      currentAbsoluteValue += e.quantity * e.value
    })
  }

  return { currentAbsoluteValue, ...meta }
}

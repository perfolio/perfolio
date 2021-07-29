import { usePortfolio } from "./usePortfolio"

export const useCurrentValue = () => {
  const { portfolio, ...meta } = usePortfolio()
  let currentValue = 0
  if (portfolio) {
    Object.values(portfolio).forEach((e) => {
      currentValue += e.quantity * e.value
    })
  }

  return { currentValue, ...meta }
}

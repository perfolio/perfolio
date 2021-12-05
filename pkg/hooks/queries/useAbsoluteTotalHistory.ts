import { toTimeseries } from "@perfolio/pkg/finance/returns"
import { usePortfolioHistory } from "./usePortfolioHistory"

export const useAbsoluteTotalHistory = (opts?: { portfolioId?: string; since?: number }) => {
  const { history, ...meta } = usePortfolioHistory(opts)

  const absoluteTotal = Object.entries(toTimeseries(history.absolute ?? [], opts?.since)).map(
    ([time, assets]) => ({
      time: Number(time),
      value: Object.values(assets)
        .map((asset) => asset.quantity * asset.value)
        .reduce((acc, val) => acc + val),
    }),
  )

  return {
    absoluteTotal,
    ...meta,
  }
}

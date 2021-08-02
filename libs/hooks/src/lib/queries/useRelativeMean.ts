import { useQuery } from "react-query"
import { useRelativePortfolioHistory } from "./useRelativePortfolioHistory"
import { Mean } from "@perfolio/feature/finance/kpis"
export const USE_RELATIVE_MEAN = "USE_RELATIVE_MEAN"

export const useRelativeMean = (range: number) => {
  const { relativePortfolioHistory, ...meta } = useRelativePortfolioHistory()
  const { data } = useQuery([USE_RELATIVE_MEAN, { range, relativePortfolioHistory }], () =>
    Mean.getRelative(
      relativePortfolioHistory.filter(({ time }) => time >= range).map(({ value }) => value),
    ),
  )

  return { relativeMean: data ?? 0, ...meta }
}

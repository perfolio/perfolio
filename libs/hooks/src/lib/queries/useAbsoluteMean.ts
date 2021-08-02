import { useQuery } from "react-query"
import { useAbsolutePortfolioHistory } from "./useAbsolutePortfolioHistory"
import { Mean } from "@perfolio/feature/finance/kpis"

export const USE_ABSOLUTE_MEAN = "USE_ABSOLUTE_MEAN"

export const useAbsoluteMean = (range: number) => {
  const { absolutePortfolioHistory, ...meta } = useAbsolutePortfolioHistory()
  const { data } = useQuery([USE_ABSOLUTE_MEAN, { range, absolutePortfolioHistory }], () =>
    Mean.getAbsolute(
      absolutePortfolioHistory.filter(({ time }) => time >= range).map(({ value }) => value),
    ),
  )

  return { absoluteMean: data ?? 0, ...meta }
}

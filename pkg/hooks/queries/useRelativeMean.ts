import { useQuery } from "react-query"
import { Mean } from "@perfolio/pkg/finance/kpis"
import { ValueAtTime } from "@perfolio/pkg/api/graphql"
export const USE_RELATIVE_MEAN = "USE_RELATIVE_MEAN"

export const useRelativeMean = (relativePortfolioHistory: ValueAtTime[]) => {
  const { data, ...meta } = useQuery([USE_RELATIVE_MEAN, { relativePortfolioHistory }], () =>
    Mean.getRelative(relativePortfolioHistory.map(({ value }) => value)),
  )

  return { relativeMean: data ?? 0, ...meta }
}

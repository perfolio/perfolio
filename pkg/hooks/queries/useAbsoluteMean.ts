import { ValueAtTime, } from "@perfolio/pkg/api/graphql"
import { Mean, } from "@perfolio/pkg/finance/kpis"
import { useQuery, } from "react-query"

export const USE_ABSOLUTE_MEAN = "USE_ABSOLUTE_MEAN"

export const useAbsoluteMean = (absolutePortfolioHistory: ValueAtTime[],) => {
  const { data, ...meta } = useQuery(
    [USE_ABSOLUTE_MEAN, { absolutePortfolioHistory, },],
    () => Mean.getAbsolute(absolutePortfolioHistory.map(({ value, },) => value),),
  )

  return { absoluteMean: data ?? 0, ...meta, }
}

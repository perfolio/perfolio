import { standardDeviation, } from "@perfolio/pkg/finance/kpis"
import { useQuery, } from "react-query"

export const USE_STANDARD_DEVIATION = "USE_STANDARD_DEVIATION"

export const useStandardDeviation = (values: number[],) => {
  const { data, ...meta } = useQuery(
    [USE_STANDARD_DEVIATION, { values, },],
    () => standardDeviation(values,),
  )

  return { standardDeviation: data ?? 0, ...meta, }
}

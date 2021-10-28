import { useQuery } from "react-query"
import { standardDeviation } from "@perfolio/feature/finance/kpis"

export const USE_STANDARD_DEVIATION = "USE_STANDARD_DEVIATION"

export const useStandardDeviation = (values: number[]) => {
  const { data, ...meta } = useQuery([USE_STANDARD_DEVIATION, { values }], () =>
    standardDeviation(values),
  )

  return { standardDeviation: data ?? 0, ...meta }
}

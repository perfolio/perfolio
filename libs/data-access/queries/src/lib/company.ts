import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { Company } from "@perfolio/types"

export const QUERY_KEY_COMPANY_BY_SYMBOL = (ticker: string): string => `company_by_${ticker}`
export function useCompany(ticker: string | undefined) {
  const api = useApi()
  const { data, ...meta } = useQuery<Company | null, Error>(
    QUERY_KEY_COMPANY_BY_SYMBOL(ticker!),
    async () => api.companies.getCompany({ ticker: ticker! }),
    {
      enabled: !!ticker,
    },
  )
  return { company: data ?? undefined, ...meta }
}

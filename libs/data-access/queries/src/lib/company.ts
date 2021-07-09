import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { Company } from "@perfolio/types"
import { useSession } from "@perfolio/auth"

export const QUERY_KEY_COMPANY_BY_SYMBOL = (ticker: string): string => `company_by_${ticker}`
export function useCompany(ticker: string | undefined) {
  const { session } = useSession()
  const api = useApi()
  const { data, ...meta } = useQuery<Company | null, Error>(
    QUERY_KEY_COMPANY_BY_SYMBOL(ticker!),
    async () => api.companies.getCompany({ ticker: ticker! }),
    {
      enabled: !!session && !!ticker,
    },
  )
  return { company: data ?? undefined, ...meta }
}

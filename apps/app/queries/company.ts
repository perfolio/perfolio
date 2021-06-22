import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { Company } from "@perfolio/types"
import { useSession } from "next-auth/client"

export const QUERY_KEY_COMPANY_BY_SYMBOL = (symbol: string): string => `company_by_${symbol}`
export function useCompany(symbol: string | undefined) {
  const [session] = useSession()
  const api = useApi()
  const { data, ...meta } = useQuery<Company, Error>(
    QUERY_KEY_COMPANY_BY_SYMBOL(symbol ?? ""),
    async () => api.companies.getCompany({ symbol: symbol! }),
    {
      enabled: !!session && !!symbol,
    },
  )
  return { company: data, ...meta }
}

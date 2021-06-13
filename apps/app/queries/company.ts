import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { Company } from "@perfolio/db"
import { useAuth } from "@perfolio/auth"

export const QUERY_KEY_COMPANY_BY_SYMBOL = (symbol: string): string => `company_by_${symbol}`
export function useCompany(symbol: string | undefined) {
  const { getToken } = useAuth()
  const token = getToken()
  const { data, ...meta } = useQuery<Company, Error>(
    QUERY_KEY_COMPANY_BY_SYMBOL(symbol ?? ""),
    async () => new Api({ token }).companies.getCompany({ symbol: symbol! }),
    {
      enabled: !!token && !!symbol,
    },
  )
  return { company: data, ...meta }
}

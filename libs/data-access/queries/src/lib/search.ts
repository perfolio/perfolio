import { useApi } from "@perfolio/data-access/api-client"
import { useQuery, useQueries } from "react-query"
import { SearchRequest, SearchResponse } from "@perfolio/api/feature/lambda"
import { useSession } from "next-auth/client"
import { QUERY_KEY_COMPANY_BY_SYMBOL } from "./company"
import { Company } from "@perfolio/types"

export const QUERY_KEY_SEARCH = (fragment: string): string => `search_${fragment}`
export function useSearch(req: SearchRequest) {
  const [session] = useSession()
  const api = useApi()
  const { data, ...meta } = useQuery<SearchResponse, Error>(
    QUERY_KEY_SEARCH(req.fragment),
    async () => await api.search.search(req),

    {
      enabled: !!session && req.fragment.length > 0,
    },
  )

  const companies = useQueries(
    (data ?? []).map((option) => {
      return {
        queryKey: QUERY_KEY_COMPANY_BY_SYMBOL(option.symbol),
        queryFn: () => api.companies.getCompany({ symbol: option.symbol }),
      }
    }),
  ).map((company) => {
    return company.data as Company
  })

  const search = (data ?? []).map((option, i) => {
    return Object.assign(option, companies[i])
  })
  return { search, ...meta }
}

import { useApi } from "@perfolio/data-access/api-client"
import { useQuery, useQueries } from "react-query"
import { SearchRequest, SearchResponse } from "@perfolio/api/feature/lambda"
import { useSession } from "@perfolio/auth"
import { QUERY_KEY_COMPANY_BY_SYMBOL } from "./company"
import { Company } from "@perfolio/types"

export type SearchResult = Company & { figi: string }

export const QUERY_KEY_SEARCH = (fragment: string): string => `search_${fragment}`
export function useSearch(req: SearchRequest) {
  const { session } = useSession()
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
        queryFn: () => api.companies.getCompany({ ticker: option.symbol }),
      }
    }),
  ).map((company, i) => {
    const figi = data ? data[i].figi : undefined
    return {
      ...(company.data as SearchResult),
      figi: figi ?? "NULL",
    }
  })

  return { search: companies, ...meta }
}

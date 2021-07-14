import { SearchRequest } from "@perfolio/api/feature/lambda"
import { Company } from "@perfolio/types"
import { useSearchCompaniesQuery } from "@perfolio/api/graphql"

export type SearchResult = Company & { figi: string }

export const QUERY_KEY_SEARCH = (fragment: string): string => `search_${fragment}`
export function useSearch(req: SearchRequest) {
  const { data, ...meta } = useSearchCompaniesQuery({
    variables: { fragment: req.fragment! },
    skip: req.fragment.length === 0,
  })

  return { search: data?.searchCompanies, ...meta }
}

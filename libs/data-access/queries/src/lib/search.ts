import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { SearchRequest, SearchResponse } from "@perfolio/api/feature/lambda"
import { useSession } from "next-auth/client"

export const QUERY_KEY_SEARCH = (fragment: string): string => `search_${fragment}`
export function useSearch(req: SearchRequest) {
  const [session] = useSession()
  const api = useApi()
  console.log({ req, session })
  const { data, ...meta } = useQuery<SearchResponse, Error>(
    QUERY_KEY_SEARCH(req.fragment),
    async () => api.search.search(req),
    {
      enabled: !!session && req.fragment.length > 0,
    },
  )
  return { search: data, ...meta }
}

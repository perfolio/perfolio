import { SearchQuery } from "@perfolio/pkg/api"
import { useAuth } from "@perfolio/pkg/auth"
import { useQuery } from "react-query"
import { client } from "../client"

export const useSearch = (fragment: string) => {
  const { getAccessToken } = useAuth()
  const { data, ...meta } = useQuery<SearchQuery, Error>(
    ["search", fragment],
    async () => await client(await getAccessToken()).search({ fragment }),
    {
      enabled: fragment.length > 0,
      cacheTime: 10_000,
    },
  )

  return { search: data?.search ?? [], ...meta }
}

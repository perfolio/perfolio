import { useQuery } from "react-query"
import { SearchQuery, SearchQueryVariables } from "@perfolio/api/graphql"

import { client } from "../client"
import { useAccessToken } from "@perfolio/auth"
export const useSearch = (variables: SearchQueryVariables) => {
  const { getAccessToken } = useAccessToken()

  const { data, ...meta } = useQuery<SearchQuery, Error>(
    ["search", variables],
    async () => client(await getAccessToken()).search(variables),
    {
      enabled: variables.fragment.length > 0,
    },
  )

  return { search: data?.search, ...meta }
}

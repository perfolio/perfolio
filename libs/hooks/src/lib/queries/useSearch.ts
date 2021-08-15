import { useQuery } from "react-query"
import { SearchQuery, SearchQueryVariables } from "@perfolio/api/graphql"

import { client } from "../client"
import { useAccessToken } from "./useAccessToken"
export const useSearch = (variables: SearchQueryVariables) => {
  const { accessToken } = useAccessToken()

  const { data, ...meta } = useQuery<SearchQuery, Error>(
    ["search", variables],
    async () => client(accessToken).search(variables),
    {
      enabled: variables.fragment.length > 0 && !!accessToken,
    },
  )

  return { search: data?.search, ...meta }
}

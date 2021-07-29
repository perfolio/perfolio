import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import { SearchQuery, SearchQueryVariables } from "@perfolio/api/graphql"

import { client } from "../client"

export const useSearch = (variables: SearchQueryVariables) => {
  const { token } = useAccessToken()

  const { data, ...meta } = useQuery<SearchQuery, Error>(
    ["search", variables],
    () => client(token!).search(variables),
    {
      enabled: !!token && variables.fragment.length > 0,
    },
  )

  return { search: data?.search, ...meta }
}

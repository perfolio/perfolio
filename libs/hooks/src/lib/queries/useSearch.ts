import { useQuery } from "react-query"
import { SearchQuery, SearchQueryVariables } from "@perfolio/api/graphql"

import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"

export const useSearch = (variables: SearchQueryVariables) => {
  const { getAccessTokenSilently } = useAuth0()

  const { data, ...meta } = useQuery<SearchQuery, Error>(
    ["search", variables],
    async () => client(await getAccessTokenSilently()).search(variables),
    {
      enabled: variables.fragment.length > 0,
    },
  )

  return { search: data?.search, ...meta }
}

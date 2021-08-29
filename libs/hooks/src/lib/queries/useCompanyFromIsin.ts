import { useQuery } from "react-query"
import {
  GetExchangeTradedAssetQuery,
  GetExchangeTradedAssetQueryVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"

export const useExchangeTradedAsset = (variables: GetExchangeTradedAssetQueryVariables) => {
  const { getAccessTokenSilently } = useAuth0()

  const { data, ...meta } = useQuery<GetExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    async () => client(await getAccessTokenSilently()).getExchangeTradedAsset(variables),
  )

  return { asset: data?.getExchangeTradedAsset, ...meta }
}

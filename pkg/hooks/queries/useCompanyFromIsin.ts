import { useQuery } from "react-query"
import {
  ExchangeTradedAssetQuery,
  ExchangeTradedAssetQueryVariables,
} from "@perfolio/pkg/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"

export const useExchangeTradedAsset = (variables: ExchangeTradedAssetQueryVariables) => {
  const { getAccessTokenSilently } = useAuth0()

  const { data, ...meta } = useQuery<ExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    async () => client(await getAccessTokenSilently()).exchangeTradedAsset(variables),
  )

  return { asset: data?.exchangeTradedAsset, ...meta }
}

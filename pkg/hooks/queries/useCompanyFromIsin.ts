import { useAuth0 } from "@auth0/auth0-react"
import { ExchangeTradedAssetQuery, ExchangeTradedAssetQueryVariables } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"

export const useExchangeTradedAsset = (variables: ExchangeTradedAssetQueryVariables) => {
  const { getAccessTokenSilently } = useAuth0()

  const { data, ...meta } = useQuery<ExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    async () => client(await getAccessTokenSilently()).exchangeTradedAsset(variables),
  )

  return { asset: data?.exchangeTradedAsset, ...meta }
}

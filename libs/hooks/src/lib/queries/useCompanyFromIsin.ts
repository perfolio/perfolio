import { useQuery } from "react-query"
import { ExchangeTradedAssetQuery, ExchangeTradedAssetQueryVariables } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAccessToken } from "@perfolio/auth"

export const useExchangeTradedAsset = (variables: ExchangeTradedAssetQueryVariables) => {
  const { getAccessToken } = useAccessToken()

  const { data, ...meta } = useQuery<ExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    async () => client(await getAccessToken()).exchangeTradedAsset(variables),
  )

  return { asset: data?.exchangeTradedAsset, ...meta }
}

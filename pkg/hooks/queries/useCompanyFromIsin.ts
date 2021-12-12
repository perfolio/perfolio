import { useAuth } from "@perfolio/pkg/auth"

import { ExchangeTradedAssetQuery, ExchangeTradedAssetQueryVariables } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"

export const useExchangeTradedAsset = (variables: ExchangeTradedAssetQueryVariables) => {
  const { getAccessToken } = useAuth()

  const { data, ...meta } = useQuery<ExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    async () => client(await getAccessToken()).exchangeTradedAsset(variables),
  )

  return { asset: data?.exchangeTradedAsset, ...meta }
}

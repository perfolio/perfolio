import { useQuery } from "react-query"
import {
  GetExchangeTradedAssetQuery,
  GetExchangeTradedAssetQueryVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { useAccessToken } from "./useAccessToken"

export const useExchangeTradedAsset = (variables: GetExchangeTradedAssetQueryVariables) => {
  const { accessToken } = useAccessToken()

  const { data, ...meta } = useQuery<GetExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    async () => client(accessToken).getExchangeTradedAsset(variables),
    { enabled: !!accessToken },
  )

  return { asset: data?.getExchangeTradedAsset, ...meta }
}

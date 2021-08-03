import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import {
  GetExchangeTradedAssetQuery,
  GetExchangeTradedAssetQueryVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"

export const useExchangeTradedAsset = (variables: GetExchangeTradedAssetQueryVariables) => {
  const { token } = useAccessToken()

  const { data, ...meta } = useQuery<GetExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    () => client(token!).getExchangeTradedAsset(variables),
    {
      enabled: !!token,
    },
  )

  return { asset: data?.getExchangeTradedAsset, ...meta }
}

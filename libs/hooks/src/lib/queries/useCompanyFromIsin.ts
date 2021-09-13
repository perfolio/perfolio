import { useQuery } from "react-query"
import {
  GetExchangeTradedAssetQuery,
  GetExchangeTradedAssetQueryVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"

export const useExchangeTradedAsset = (variables: GetExchangeTradedAssetQueryVariables) => {
  const { getAccessToken } = useAuth()

  const { data, ...meta } = useQuery<GetExchangeTradedAssetQuery, Error>(
    ["getCompanyFromIsin", variables],
    async () => client(await getAccessToken()).getExchangeTradedAsset(variables),
  )

  return { asset: data?.getExchangeTradedAsset, ...meta }
}

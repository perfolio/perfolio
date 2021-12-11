import {useAuth} from "@perfolio/pkg/auth"
import {
  CreateExchangeTradedAssetMutation,
  CreateExchangeTradedAssetMutationVariables,
} from "@perfolio/pkg/api"
import { useMutation } from "react-query"
import { client } from "../client"

export const useCreateExchangeTradedAsset = () => {
  const { getAccessToken } = useAuth()
  const { data, ...meta } = useMutation<
    CreateExchangeTradedAssetMutation,
    Error,
    CreateExchangeTradedAssetMutationVariables
  >(async (variables) => {
    return await client(await getAccessToken()).createExchangeTradedAsset(variables)
  })

  return { transaction: data?.createExchangeTradedAsset, ...meta }
}

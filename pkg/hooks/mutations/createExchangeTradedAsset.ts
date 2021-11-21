import { useAuth0 } from "@auth0/auth0-react"
import {
  CreateExchangeTradedAssetMutation,
  CreateExchangeTradedAssetMutationVariables,
} from "@perfolio/pkg/api"
import { useMutation } from "react-query"
import { client } from "../client"

export const useCreateExchangeTradedAsset = () => {
  const { getAccessTokenSilently } = useAuth0()
  const { data, ...meta } = useMutation<
    CreateExchangeTradedAssetMutation,
    Error,
    CreateExchangeTradedAssetMutationVariables
  >(
    async (variables) => {
      return await client(await getAccessTokenSilently()).createExchangeTradedAsset(variables)
    },
  )

  return { transaction: data?.createExchangeTradedAsset, ...meta }
}

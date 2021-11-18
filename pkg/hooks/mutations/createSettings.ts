import { useAuth0, } from "@auth0/auth0-react"
import { CreateSettingsMutation, CreateSettingsMutationVariables, } from "@perfolio/pkg/api"
import { useMutation, useQueryClient, } from "react-query"
import { client, } from "../client"
import { USE_USER_QUERY_KEY, } from "../queries/useUser"
export const useCreateSettings = () => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently, } = useAuth0()
  const { data, ...meta } = useMutation<
    CreateSettingsMutation,
    Error,
    CreateSettingsMutationVariables
  >(
    async (variables,) => {
      return client(await getAccessTokenSilently(),).createSettings(variables,)
    },
    {
      onSettled: () => {
        queryClient.resetQueries(USE_USER_QUERY_KEY,)
      },
    },
  )

  return { settings: data?.createSettings, ...meta, }
}

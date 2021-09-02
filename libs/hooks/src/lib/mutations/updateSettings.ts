import { useMutation, useQueryClient } from "react-query"
import { UpdateSettingsMutation, UpdateSettingsMutationVariables } from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useSettings"
import { useAuth0 } from "@auth0/auth0-react"
export const useUpdateSettings = () => {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    UpdateSettingsMutation,
    Error,
    UpdateSettingsMutationVariables
  >(
    async (variables) => {
      return client(await getAccessTokenSilently()).updateSettings(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_USER_SETTINGS_QUERY_KEY)
      },
    },
  )

  return { settings: data?.updateSettings, ...meta }
}

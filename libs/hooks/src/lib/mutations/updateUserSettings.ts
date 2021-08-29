import { useMutation, useQueryClient } from "react-query"
import {
  UpdateUserSettingsMutation,
  UpdateUserSettingsMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useUserSettings"
import { useAuth0 } from "@auth0/auth0-react"
export const useUpdateUserSettings = () => {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    UpdateUserSettingsMutation,
    Error,
    UpdateUserSettingsMutationVariables
  >(
    async (variables) => {
      return client(await getAccessTokenSilently()).updateUserSettings(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_USER_SETTINGS_QUERY_KEY)
      },
    },
  )

  return { settings: data?.updateUserSettings, ...meta }
}

import { useMutation, useQueryClient } from "react-query"
import {
  CreateUserSettingsMutation,
  CreateUserSettingsMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useUserSettings"
import { useAuth0 } from "@auth0/auth0-react"

export const useCreateUserSettings = () => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const { data, ...meta } = useMutation<
    CreateUserSettingsMutation,
    Error,
    CreateUserSettingsMutationVariables
  >(
    async (variables) => {
      return client(await getAccessTokenSilently()).CreateUserSettings(variables)
    },
    {
      onSuccess: () => {
        queryClient.resetQueries(USE_USER_SETTINGS_QUERY_KEY)
      },
    },
  )

  return { settings: data?.createUserSettings, ...meta }
}

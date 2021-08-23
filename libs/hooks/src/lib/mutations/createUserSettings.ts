import { useMutation, useQueryClient } from "react-query"
import {
  CreateUserSettingsMutation,
  CreateUserSettingsMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useUserSettings"
import { useAccessToken } from "../queries/useAccessToken"

export const useCreateUserSettings = () => {
  const queryClient = useQueryClient()
  const { accessToken } = useAccessToken()
  const { data, ...meta } = useMutation<
    CreateUserSettingsMutation,
    Error,
    CreateUserSettingsMutationVariables
  >(
    async (variables) => {
      return client(accessToken).CreateUserSettings(variables)
    },
    {
      onSettled: () => {
        queryClient.resetQueries(USE_USER_SETTINGS_QUERY_KEY)
      },
    },
  )

  return { settings: data?.createUserSettings, ...meta }
}

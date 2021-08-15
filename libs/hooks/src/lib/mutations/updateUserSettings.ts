import { useMutation, useQueryClient } from "react-query"
import {
  UpdateUserSettingsMutation,
  UpdateUserSettingsMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useUserSettings"
import { useAccessToken } from "../queries/useAccessToken"

export const useUpdateUserSettings = () => {
  const { accessToken } = useAccessToken()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    UpdateUserSettingsMutation,
    Error,
    UpdateUserSettingsMutationVariables
  >(
    async (variables) => {
      return client(accessToken).updateUserSettings(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_USER_SETTINGS_QUERY_KEY)
      },
    },
  )

  return { settings: data?.updateUserSettings, ...meta }
}

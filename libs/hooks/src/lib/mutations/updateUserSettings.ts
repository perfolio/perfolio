import { useAccessToken } from "../queries/useAccessToken"
import { useMutation, useQueryClient } from "react-query"
import {
  UpdateUserSettingsMutation,
  UpdateUserSettingsMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { useClerk } from "@clerk/clerk-react"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useUserSettings"
import { ensureAccessToken } from "../ensureAccessToken"

export const useUpdateUserSettings = () => {
  const { token } = useAccessToken()
  const queryClient = useQueryClient()
  const clerk = useClerk()
  const { data, ...meta } = useMutation<
    UpdateUserSettingsMutation,
    Error,
    UpdateUserSettingsMutationVariables
  >(
    async (variables) => {
      const accessToken = await ensureAccessToken(token, clerk.session?.id)
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

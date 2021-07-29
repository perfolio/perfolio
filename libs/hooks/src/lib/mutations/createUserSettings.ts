import { useAccessToken } from "../queries/useAccessToken"
import { useMutation, useQueryClient } from "react-query"
import {
  CreateUserSettingsMutation,
  CreateUserSettingsMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { useClerk } from "@clerk/clerk-react"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useUserSettings"
import { ensureAccessToken } from "../ensureAccessToken"

export const useCreateUserSettings = () => {
  const { token } = useAccessToken()
  const queryClient = useQueryClient()
  const clerk = useClerk()
  const { data, ...meta } = useMutation<
    CreateUserSettingsMutation,
    Error,
    CreateUserSettingsMutationVariables
  >(
    async (variables) => {
      const accessToken = await ensureAccessToken(token, clerk.session?.id)
      return client(accessToken).CreateUserSettings(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_USER_SETTINGS_QUERY_KEY)
      },
    },
  )

  return { settings: data?.createUserSettings, ...meta }
}

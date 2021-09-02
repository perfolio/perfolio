import { useMutation, useQueryClient } from "react-query"
import { CreateSettingsMutation, CreateSettingsMutationVariables } from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_USER_SETTINGS_QUERY_KEY } from "../queries/useSettings"
import { useAuth0 } from "@auth0/auth0-react"
export const useCreateSettings = () => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const { data, ...meta } = useMutation<
    CreateSettingsMutation,
    Error,
    CreateSettingsMutationVariables
  >(
    async (variables) => {
      return client(await getAccessTokenSilently()).CreateSettings(variables)
    },
    {
      onSettled: () => {
        queryClient.resetQueries(USE_USER_SETTINGS_QUERY_KEY)
      },
    },
  )

  return { settings: data?.createSettings, ...meta }
}

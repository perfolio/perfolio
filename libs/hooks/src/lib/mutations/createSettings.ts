import { useMutation, useQueryClient } from "react-query"
import { CreateSettingsMutation, CreateSettingsMutationVariables } from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_USER_QUERY_KEY } from "../queries/useUser"
import { useAccessToken } from "@perfolio/auth"
export const useCreateSettings = () => {
  const queryClient = useQueryClient()
  const { getAccessToken } = useAccessToken()
  const { data, ...meta } = useMutation<
    CreateSettingsMutation,
    Error,
    CreateSettingsMutationVariables
  >(
    async (variables) => {
      return client(await getAccessToken()).createSettings(variables)
    },
    {
      onSettled: () => {
        queryClient.resetQueries(USE_USER_QUERY_KEY)
      },
    },
  )

  return { settings: data?.createSettings, ...meta }
}

import { useAuth } from "@perfolio/pkg/auth"

import { UpdateSettings, UpdateSettingsMutation } from "@perfolio/pkg/api"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"
import { USE_USER_QUERY_KEY } from "../queries/useUser"

export const useUpdateSettings = () => {
  const { getAccessToken, getClaims } = useAuth()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    UpdateSettingsMutation,
    Error,
    { settings: Omit<UpdateSettings, "userId"> }
  >(
    async (variables) => {
      const accessToken = await getAccessToken()
      const { sub } = await getClaims(accessToken)
      return client(accessToken).updateSettings({
        settings: { ...variables.settings, userId: sub },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_USER_QUERY_KEY)
      },
    },
  )

  return { settings: data?.updateSettings, ...meta }
}

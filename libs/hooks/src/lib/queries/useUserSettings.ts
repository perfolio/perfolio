import { useQuery } from "react-query"
import { GetUserSettingsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAccessToken } from "./useAccessToken"
import { useUser } from "./useUser"
export const USE_USER_SETTINGS_QUERY_KEY = "getUserSettings"

export const useUserSettings = () => {
  const { user } = useUser()
  const { accessToken } = useAccessToken()

  const { data, ...meta } = useQuery<GetUserSettingsQuery, Error>(
    USE_USER_SETTINGS_QUERY_KEY,
    async () => client(accessToken).getUserSettings({ userId: user.id }),
    {
      enabled: !!user.id && !!accessToken,
    },
  )

  return { settings: data?.getUserSettings, ...meta }
}

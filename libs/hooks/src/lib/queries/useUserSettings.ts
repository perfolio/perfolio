import { useQuery } from "react-query"
import { GetUserSettingsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAccessToken } from "./useAccessToken"
import { useUser } from "@auth0/nextjs-auth0"
export const USE_USER_SETTINGS_QUERY_KEY = "getUserSettings"

export const useUserSettings = () => {
  const { user } = useUser()
  const { accessToken } = useAccessToken()

  const { data, ...meta } = useQuery<GetUserSettingsQuery, Error>(
    USE_USER_SETTINGS_QUERY_KEY,
    async () => client(accessToken).getUserSettings({ userId: user!.sub! }),
    {
      enabled: !!user?.sub && !!accessToken,
    },
  )

  return { settings: data?.getUserSettings, ...meta }
}

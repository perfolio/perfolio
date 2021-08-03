import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import { GetUserSettingsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useUser } from "@clerk/clerk-react"

export const USE_USER_SETTINGS_QUERY_KEY = "getUserSettings"

export const useUserSettings = () => {
  const { token } = useAccessToken()
  const user = useUser()

  const { data, ...meta } = useQuery<GetUserSettingsQuery, Error>(
    USE_USER_SETTINGS_QUERY_KEY,
    () => client(token!).getUserSettings({ userId: user.id }),
    {
      enabled: !!token,
    },
  )

  return { settings: data?.getUserSettings, ...meta }
}

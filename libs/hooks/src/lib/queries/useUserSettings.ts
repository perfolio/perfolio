import { useQuery } from "react-query"
import { GetUserSettingsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"

export const USE_USER_SETTINGS_QUERY_KEY = "getUserSettings"

export const useUserSettings = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const { data, ...meta } = useQuery<GetUserSettingsQuery, Error>(
    USE_USER_SETTINGS_QUERY_KEY,
    async () => client(await getAccessTokenSilently()).getUserSettings({ userId: user!.sub! }),
    {
      enabled: !!user?.sub,
    },
  )

  return { settings: data?.getUserSettings, ...meta }
}

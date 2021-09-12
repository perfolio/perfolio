import { useQuery } from "react-query"
import { GetSettingsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"
export const USE_USER_SETTINGS_QUERY_KEY = "getSettings"

export const useSettings = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const { data, ...meta } = useQuery<GetSettingsQuery, Error>(
    USE_USER_SETTINGS_QUERY_KEY,
    async () => client(await getAccessTokenSilently()).getSettings({ userId: user!.sub! }),
    {
      enabled: !!user?.sub,
    },
  )

  return { settings: data?.getSettings, ...meta }
}

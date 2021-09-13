import { useQuery } from "react-query"
import { GetSettingsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"
export const USE_USER_SETTINGS_QUERY_KEY = "getSettings"

export const useSettings = () => {
  const { getAccessToken, getClaims } = useAuth()

  const { data, ...meta } = useQuery<GetSettingsQuery, Error>(
    USE_USER_SETTINGS_QUERY_KEY,
    async () => {
      const token = await getAccessToken()
      const claims = await getClaims(token)
      return await client(token).getSettings({ userId: claims.sub })
    },
  )

  return { settings: data?.getSettings, ...meta }
}

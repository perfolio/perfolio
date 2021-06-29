import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { useSession } from "next-auth/client"
import { GetSettingsResponse } from "@perfolio/api/feature/lambda"

export const QUERY_KEY_SETTINGS = "settings"
export function useSettings() {
  const [session] = useSession()
  const api = useApi()

  const { data, ...meta } = useQuery<GetSettingsResponse, Error>(
    QUERY_KEY_SETTINGS,
    async () => api.settings.getSettings(),
    {
      enabled: !!session,
    },
  )
  return { settings: data, ...meta }
}

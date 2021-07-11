import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetSettingsResponse } from "@perfolio/api/feature/lambda"

export const QUERY_KEY_SETTINGS = "settings"
export function useSettings() {
  const api = useApi()

  const { data, ...meta } = useQuery<GetSettingsResponse, Error>(QUERY_KEY_SETTINGS, async () =>
    api.settings.getSettings(),
  )
  return { settings: data, ...meta }
}

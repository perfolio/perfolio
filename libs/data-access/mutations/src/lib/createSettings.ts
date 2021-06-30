import { useMutation, useQueryClient } from "react-query"
import { useApi } from "@perfolio/data-access/api-client"
import { CreateSettingsRequest, CreateSettingsResponse } from "@perfolio/api/feature/lambda"
import { QUERY_KEY_SETTINGS } from "@perfolio/data-access/queries"

export function useCreateSettings() {
  const queryClient = useQueryClient()
  const api = useApi()

  return useMutation<CreateSettingsResponse, Error, CreateSettingsRequest>({
    mutationFn: (variables: CreateSettingsRequest) => api.settings.createSettings(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY_SETTINGS)
    },
  })
}

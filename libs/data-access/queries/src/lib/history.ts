import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { useSession } from "@perfolio/auth"

import { History } from "@perfolio/api/feature/lambda"

export const QUERY_KEY_GET_HISTORY = "history"

export function useHistory() {
  const api = useApi()

  const { session } = useSession()
  const { data, ...meta } = useQuery<History, Error>(
    QUERY_KEY_GET_HISTORY,
    async () => api.holdings.getHistory(),
    {
      enabled: !!session,
    },
  )
  return { history: data, ...meta }
}

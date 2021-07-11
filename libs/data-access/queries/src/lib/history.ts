import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"

import { History } from "@perfolio/api/feature/lambda"

export const QUERY_KEY_GET_HISTORY = "history"

export function useHistory() {
  const api = useApi()

  const { data, ...meta } = useQuery<History, Error>(QUERY_KEY_GET_HISTORY, async () =>
    api.holdings.getHistory(),
  )
  return { history: data, ...meta }
}

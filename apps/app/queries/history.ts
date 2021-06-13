import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { useAuth } from "@perfolio/auth"
import { History } from "@perfolio/lambda"

export const QUERY_KEY_GET_HISTORY = "history"

export function useHistory() {
  const { getToken } = useAuth()
  const token = getToken()
  const { data, ...meta } = useQuery<History, Error>(
    QUERY_KEY_GET_HISTORY,
    async () => new Api({ token }).holdings.getHistory(),
    {
      enabled: !!token,
    },
  )
  return { history: data, ...meta }
}

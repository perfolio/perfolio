import { request } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { useAuth } from "@perfolio/auth"
import { History } from "../pages/api/holdings/getHistory"

export const QUERY_KEY_GET_HISTORY = "history"

export function useHistory() {
  const { getToken } = useAuth()
  const token = getToken()
  const { data, ...meta } = useQuery<History, Error>(
    QUERY_KEY_GET_HISTORY,
    async () => {
      return request<History>({
        token,
        path: "/api/holdings/getHistory",
      })
    },
    {
      enabled: !!token,
    },
  )
  return { history: data, ...meta }
}

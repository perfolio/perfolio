import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { useSession } from "next-auth/client"

import { History } from "@perfolio/lambda"

export const QUERY_KEY_GET_HISTORY = "history"

export function useHistory() {
  const [session] = useSession()
  const { data, ...meta } = useQuery<History, Error>(
    QUERY_KEY_GET_HISTORY,
    async () => new Api().holdings.getHistory(),
    {
      enabled: !!session,
    },
  )
  return { history: data, ...meta }
}

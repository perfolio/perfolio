import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { useSession } from "next-auth/client"
import { GetExchangesResponse } from "@perfolio/integrations/iexcloud"
export const QUERY_KEY_EXCHANGES = "exchanges"
export function useExchanges() {
  const [session] = useSession()
  const api = useApi()

  const { data, ...meta } = useQuery<GetExchangesResponse, Error>(
    QUERY_KEY_EXCHANGES,
    async () => await api.exchanges.getExchanges(),
    {
      enabled: !!session,
    },
  )
  return { exchanges: data, ...meta }
}

import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetExchangesResponse } from "@perfolio/integrations/iexcloud"
export const QUERY_KEY_EXCHANGES = "exchanges"
export function useExchanges() {
  const api = useApi()

  const { data, ...meta } = useQuery<GetExchangesResponse, Error>(
    QUERY_KEY_EXCHANGES,
    async () => await api.exchanges.getExchanges(),
  )
  return { exchanges: data, ...meta }
}

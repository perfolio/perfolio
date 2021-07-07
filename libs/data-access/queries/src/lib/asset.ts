import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetTickerFromFigiRequest, GetTickerFromFigiResponse } from "@perfolio/api/feature/lambda"
import { useSession } from "next-auth/client"

export const QUERY_KEY_TICKER_FROM_FIGI = (figi: string): string => `ticker_from_figi_${figi}`
export function useTickerFromFigi(req: GetTickerFromFigiRequest) {
  const [session] = useSession()
  const api = useApi()

  const { data, ...meta } = useQuery<GetTickerFromFigiResponse, Error>(
    QUERY_KEY_TICKER_FROM_FIGI(req.figi),
    async () => api.assets.getTickerFromFigi(req),
    {
      enabled: !!session && !!req.figi,
    },
  )

  return { ticker: data?.symbol, ...meta }
}

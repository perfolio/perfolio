import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetTickerFromFigiRequest, GetTickerFromFigiResponse } from "@perfolio/api/feature/lambda"

export const QUERY_KEY_TICKER_FROM_FIGI = (figi: string): string => `ticker_from_figi_${figi}`
export function useTickerFromFigi(req: GetTickerFromFigiRequest) {
  const api = useApi()

  const { data, ...meta } = useQuery<GetTickerFromFigiResponse, Error>(
    QUERY_KEY_TICKER_FROM_FIGI(req.figi),
    async () => api.assets.getTickerFromFigi(req),
    {
      enabled: !!req.figi,
    },
  )

  return { ticker: data?.symbol, ...meta }
}

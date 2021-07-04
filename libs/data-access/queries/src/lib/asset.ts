import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetSymbolFromFigiRequest } from "@perfolio/api/feature/lambda"
import { useSession } from "next-auth/client"

export const QUERY_KEY_SYMBOL_FROM_FIGI = (figi: string): string => `symbol_from_figi_${figi}`
export function useSymbolFromFigi(req: GetSymbolFromFigiRequest) {
  const [session] = useSession()
  const api = useApi()

  const { data, ...meta } = useQuery<{ symbol: string }, Error>(
    QUERY_KEY_SYMBOL_FROM_FIGI(req.figi),
    async () => api.assets.getSymbolFromFigi(req),
    {
      enabled: !!session && !!req.figi,
    },
  )
  return { symbol: data?.symbol, ...meta }
}

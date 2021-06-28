import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetPriceRequest } from "@perfolio/api/feature/lambda"
import { Price } from "@perfolio/types"
import { useSession } from "next-auth/client"

export function usePrice(req: GetPriceRequest) {
  const [session] = useSession()
  const api = useApi()

  return useQuery<Price, Error>(
    `price_by_${req.symbol}_and_${req.time}`,
    async () => api.prices.getPrice(req),
    {
      enabled: !!session && !!req.symbol,
    },
  )
}
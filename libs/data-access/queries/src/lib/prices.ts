import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { GetPriceRequest } from "@perfolio/api/feature/lambda"
import { Price } from "@perfolio/types"

export function usePrice(req: GetPriceRequest) {
  const api = useApi()

  return useQuery<Price, Error>(
    `price_by_${req.ticker}_and_${req.time}`,
    async () => api.prices.getPrice(req),
    {
      enabled: !!req.ticker,
    },
  )
}

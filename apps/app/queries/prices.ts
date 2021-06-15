import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { GetPriceRequest } from "@perfolio/lambda"
import { Price } from "@perfolio/types"
import { useAuth } from "@perfolio/auth"

export function usePrice(req: GetPriceRequest) {
  const { getToken } = useAuth()
  const token = getToken()
  return useQuery<Price, Error>(
    `price_by_${req.symbol}_and_${req.time}`,
    async () => new Api({ token }).prices.getPrice(req),
    {
      enabled: !!token && !!req.symbol,
    },
  )
}

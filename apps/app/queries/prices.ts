import { request } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { GetPriceRequest, GetPriceRequestValidation } from "../pages/api/prices/getPrice"
import { Price } from "@perfolio/db"
import { useAuth } from "@perfolio/auth"

export function usePrice(req: GetPriceRequest) {
  const { getToken } = useAuth()
  const token = getToken()
  return useQuery<Price, Error>(
    `price_by_${req.symbol}_and_${req.time}`,
    async () => {
      return request<Price>({
        token,
        path: "/api/price/getPrice",
        body: GetPriceRequestValidation.parse(req),
      })
    },
    {
      enabled: !!token && !!req.symbol,
    },
  )
}

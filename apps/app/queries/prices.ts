import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { GetPriceRequest } from "@perfolio/lambda"
import { Price } from "@perfolio/types"
import { useSession } from "next-auth/client"

export function usePrice(req: GetPriceRequest) {
  const [session] = useSession()
  return useQuery<Price, Error>(
    `price_by_${req.symbol}_and_${req.time}`,
    async () => new Api().prices.getPrice(req),
    {
      enabled: !!session && !!req.symbol,
    },
  )
}

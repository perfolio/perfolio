import { useQuery, useSession } from "blitz"
import { Time } from "pkg/time"
import getPrice from "../queries/getPrice"

export const usePrice = (
  symbol: string | undefined,
  time: Time | undefined,
) => {
  const sess = useSession()
  const [price, { isLoading, error }] = useQuery(
    getPrice,
    {
      symbol: symbol!,
      time: time?.unix()!,
    },
    {
      enabled: !!symbol && !!time && !!sess.userId,
      suspense: false,
    },
  )
  if (!price) {
  }
  return {
    price,
    isLoading,
    error: price ? error : new Error(`No price found for ${symbol}`),
  }
}

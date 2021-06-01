import { useQuery, useSession } from "blitz"
import getCurrentPrice from "../queries/getCurrentPrice"

export const useCurrentPrice = (symbol: string | undefined) => {
  const sess = useSession()
  const [currentPrice, { isLoading, error }] = useQuery(
    getCurrentPrice,
    {
      symbol: symbol!,
    },
    {
      enabled: !!symbol && !!sess.userId,
      suspense: false,
    },
  )
  return { currentPrice, isLoading, error }
}

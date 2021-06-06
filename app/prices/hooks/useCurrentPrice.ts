import { useQuery, useAuthenticatedSession } from "blitz"
import getCurrentPrice from "../queries/getCurrentPrice"

export const useCurrentPrice = (symbol: string | undefined) => {
  const sess = useAuthenticatedSession()
  return useQuery(
    getCurrentPrice,
    {
      symbol: symbol!,
    },
    {
      enabled: !!symbol && !!sess.userId,
      suspense: false,
    },
  )
}

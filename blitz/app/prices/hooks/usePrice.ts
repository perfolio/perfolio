import { useQuery, useAuthenticatedSession } from "blitz"
import { Time } from "app/time"
import getPrice from "../queries/getPrice"

export const usePrice = (
  symbol: string | undefined,
  time: Time | undefined,
) => {
  const sess = useAuthenticatedSession()
  return useQuery(
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
}

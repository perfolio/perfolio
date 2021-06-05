import { useAuthenticatedSession, useQuery } from "blitz"
import getTransactions from "app/transactions/queries/getTransactions"

export const useTransactions = () => {
  const sess = useAuthenticatedSession()
  return useQuery(
    getTransactions,
    { userId: sess.userId },
    {
      enabled: !!sess.userId,
      suspense: false,
    },
  )
}

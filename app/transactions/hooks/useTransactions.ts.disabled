import { useAuthenticatedSession, useQuery } from "blitz"
import getTransactions from "app/transactions/queries/getTransactions"

export const useTransactions = () => {
  const sess = useAuthenticatedSession()
  const [transactions, { isLoading, error }] = useQuery(
    getTransactions,
    { userId: sess.userId },
    {
      enabled: !!sess.userId,
      suspense: false,
    },
  )
  return { transactions, isLoading, error }
}

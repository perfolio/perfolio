import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { Transaction } from "@perfolio/data-access/db"
import { useSession } from "next-auth/client"

export const USE_TRANSACTIONS_QUERY_KEY = "transactions"

export function useTransactions() {
  const [session] = useSession()
  const api = useApi()

  const { data, ...meta } = useQuery<Transaction[], Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    async () => api.transactions.getTransactions(),
    {
      enabled: !!session,
    },
  )
  return { transactions: data, ...meta }
}

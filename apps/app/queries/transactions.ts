import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { Transaction } from "@perfolio/db"
import { useSession } from "next-auth/client"

export const USE_TRANSACTIONS_QUERY_KEY = "transactions"

export function useTransactions() {
  const [session] = useSession()
  const { data, ...meta } = useQuery<Transaction[], Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    async () => new Api().transactions.getTransactions(),
    {
      enabled: !!session,
    },
  )
  return { transactions: data, ...meta }
}

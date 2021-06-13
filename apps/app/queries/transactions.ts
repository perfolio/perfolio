import { Api } from "@perfolio/api-client"
import { useQuery } from "react-query"
import { Transaction } from "@perfolio/db"
import { useAuth } from "@perfolio/auth"

export const USE_TRANSACTIONS_QUERY_KEY = "transactions"

export function useTransactions() {
  const { getToken } = useAuth()
  const token = getToken()
  const { data, ...meta } = useQuery<Transaction[], Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    async () => new Api({ token }).transactions.getTransactions(),
    {
      enabled: !!token,
    },
  )
  return { transactions: data, ...meta }
}

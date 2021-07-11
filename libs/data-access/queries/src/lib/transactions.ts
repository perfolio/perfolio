import { useApi } from "@perfolio/data-access/api-client"
import { useQuery } from "react-query"
import { Transaction } from "@perfolio/integrations/fauna"

export const USE_TRANSACTIONS_QUERY_KEY = "transactions"

export function useTransactions() {
  const api = useApi()

  const { data, ...meta } = useQuery<Transaction[], Error>(USE_TRANSACTIONS_QUERY_KEY, async () =>
    api.transactions.getTransactions(),
  )
  return { transactions: data, ...meta }
}

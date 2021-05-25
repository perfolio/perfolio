import { Transaction } from ".prisma/client"
import { useQuery } from "react-query"

interface UseTransactionResponse {
  isLoading: boolean
  error: Error | null
  data: Transaction[] | undefined
}

/**
 *Fetches data to render a barchart.
 */
export function useTransactions(): UseTransactionResponse {
  const { data, isLoading, error } = useQuery<
    { transactions: Transaction[] },
    Error
  >(["getTransactions"], async () => {
    return fetch("/api/service/vault/transactions/get").then((res) =>
      res.json(),
    )
  })
  return {
    isLoading,
    error,
    data: data?.transactions,
  }
}

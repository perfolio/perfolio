import { Transaction } from "@perfolio/integrations/fauna"
import { useMutation, useQueryClient } from "react-query"
import { useApi } from "@perfolio/data-access/api-client"

import { CreateTransactionRequest } from "@perfolio/api/feature/lambda"
import { USE_TRANSACTIONS_QUERY_KEY } from "@perfolio/data-access/queries"

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  const api = useApi()

  return useMutation<Transaction, Error, CreateTransactionRequest>({
    mutationFn: (variables: CreateTransactionRequest) =>
      api.transactions.createTransaction(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

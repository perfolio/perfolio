import { useMutation, useQueryClient } from "react-query"
import { useApi } from "@perfolio/data-access/api-client"

import { DeleteTransactionRequest } from "@perfolio/api/feature/lambda"
import { USE_TRANSACTIONS_QUERY_KEY } from "@perfolio/data-access/queries"

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  const api = useApi()

  return useMutation<void, Error, DeleteTransactionRequest>({
    mutationFn: (variables: DeleteTransactionRequest) =>
      api.transactions.deleteTransaction(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

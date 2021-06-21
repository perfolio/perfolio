import { useMutation, useQueryClient } from "react-query"
import { Api } from "@perfolio/api-client"

import { DeleteTransactionRequest } from "@perfolio/lambda"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries"

export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, DeleteTransactionRequest>({
    mutationFn: (variables: DeleteTransactionRequest) =>
      new Api().transactions.deleteTransaction(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

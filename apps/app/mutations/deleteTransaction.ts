import { useMutation, useQueryClient } from "react-query"
import { Api } from "@perfolio/api-client"
import { useAuth } from "@perfolio/auth"
import { DeleteTransactionRequest } from "@perfolio/lambda"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries"

export function useDeleteTransaction() {
  const { getToken } = useAuth()
  const token = getToken()
  const queryClient = useQueryClient()

  return useMutation<void, Error, DeleteTransactionRequest>({
    mutationFn: (variables: DeleteTransactionRequest) =>
      new Api({ token }).transactions.deleteTransaction(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

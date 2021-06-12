import { Transaction } from "@perfolio/db"
import { useMutation, useQueryClient } from "react-query"
import { request } from "@perfolio/api-client"
import { useAuth } from "@perfolio/auth"
import {
  DeleteTransactionRequestValidation,
  DeleteTransactionRequest,
} from "../pages/api/transactions/delete"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries"

export function useDeleteTransaction() {
  const { getToken } = useAuth()
  const token = getToken()
  const queryClient = useQueryClient()

  return useMutation<Transaction, Error, DeleteTransactionRequest>({
    mutationFn: (variables: DeleteTransactionRequest) => {
      return request<Transaction>({
        token,
        path: "/api/transactions/delete",
        body: DeleteTransactionRequestValidation.parse(variables),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

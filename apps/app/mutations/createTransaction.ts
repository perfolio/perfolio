import { Transaction } from "@perfolio/db"
import { useMutation, useQueryClient } from "react-query"
import { request } from "@perfolio/api-client"
import { useAuth } from "@perfolio/auth"
import {
  CreateTransactionRequestValidation,
  CreateTransactionRequest,
} from "../pages/api/transactions/create"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries"

export function useCreateTransaction() {
  const { getToken } = useAuth()
  const token = getToken()
  const queryClient = useQueryClient()

  return useMutation<Transaction, Error, CreateTransactionRequest>({
    mutationFn: (variables: CreateTransactionRequest) => {
      return request<Transaction>({
        token,
        path: "/api/transactions/create",
        body: CreateTransactionRequestValidation.parse(variables),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

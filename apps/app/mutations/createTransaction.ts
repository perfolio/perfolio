import { Transaction } from "@perfolio/db"
import { useMutation, useQueryClient } from "react-query"
import { Api } from "@perfolio/api-client"
import { useAuth } from "@perfolio/auth"
import { CreateTransactionRequest } from "@perfolio/lambda"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries"

export function useCreateTransaction() {
  const { getToken } = useAuth()
  const token = getToken()
  const queryClient = useQueryClient()

  return useMutation<Transaction, Error, CreateTransactionRequest>({
    mutationFn: (variables: CreateTransactionRequest) =>
      new Api({ token }).transactions.createTransaction(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

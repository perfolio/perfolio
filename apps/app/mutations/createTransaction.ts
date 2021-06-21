import { Transaction } from "@perfolio/db"
import { useMutation, useQueryClient } from "react-query"
import { Api } from "@perfolio/api-client"

import { CreateTransactionRequest } from "@perfolio/lambda"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries"

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation<Transaction, Error, CreateTransactionRequest>({
    mutationFn: (variables: CreateTransactionRequest) =>
      new Api().transactions.createTransaction(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
    },
  })
}

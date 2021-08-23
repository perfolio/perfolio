import { useMutation, useQueryClient } from "react-query"
import {
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries/useTransactions"
import { useAccessToken } from "../queries/useAccessToken"

export const useDeleteTransaction = () => {
  const { accessToken } = useAccessToken()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    DeleteTransactionMutation,
    Error,
    DeleteTransactionMutationVariables
  >(
    async (variables) => {
      return client(accessToken).DeleteTransaction(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
      },
    },
  )

  return { transaction: data?.deleteTransaction, ...meta }
}

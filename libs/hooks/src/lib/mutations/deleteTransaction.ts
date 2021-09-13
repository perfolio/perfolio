import { useMutation, useQueryClient } from "react-query"
import {
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries/useTransactions"
import { useAuth } from "@perfolio/auth"

export const useDeleteTransaction = () => {
  const { getAccessToken } = useAuth()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    DeleteTransactionMutation,
    Error,
    DeleteTransactionMutationVariables
  >(
    async (variables) => {
      return client(await getAccessToken()).DeleteTransaction(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
      },
    },
  )

  return { transaction: data?.deleteTransaction, ...meta }
}

import { useAccessToken } from "../queries/useAccessToken"
import { useMutation, useQueryClient } from "react-query"
import {
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { useClerk } from "@clerk/clerk-react"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries/useTransactions"
import { ensureAccessToken } from "../ensureAccessToken"

export const useDeleteTransaction = () => {
  const { token } = useAccessToken()
  const queryClient = useQueryClient()
  const clerk = useClerk()
  const { data, ...meta } = useMutation<
    DeleteTransactionMutation,
    Error,
    DeleteTransactionMutationVariables
  >(
    async (variables) => {
      const accessToken = await ensureAccessToken(token, clerk.session?.id)
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

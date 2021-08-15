import { useMutation, useQueryClient } from "react-query"
import {
  CreateTransactionMutation,
  CreateTransactionMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries/useTransactions"
import { USE_PORTFOLIO_HISTORY_QUERY_KEY } from "../queries/usePortfolioHistory"
import { useAccessToken } from "../queries/useAccessToken"

export const useCreateTransaction = () => {
  const { accessToken } = useAccessToken()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    CreateTransactionMutation,
    Error,
    CreateTransactionMutationVariables
  >(
    async (variables) => {
      return await client(accessToken).CreateTransaction(variables)
    },
    {
      onSuccess: () => {
        queryClient.resetQueries(USE_TRANSACTIONS_QUERY_KEY)
        queryClient.resetQueries(USE_PORTFOLIO_HISTORY_QUERY_KEY)
      },
    },
  )

  return { transaction: data?.createTransaction, ...meta }
}

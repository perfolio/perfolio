import { useMutation, useQueryClient } from "react-query"
import {
  CreateTransactionMutation,
  CreateTransactionMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_PORTFOLIO_HISTORY_QUERY_KEY } from "../queries/usePortfolioHistory"
import { useAccessToken } from "@perfolio/auth"

export const useCreateTransaction = () => {
  const { getAccessToken } = useAccessToken()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    CreateTransactionMutation,
    Error,
    CreateTransactionMutationVariables
  >(
    async (variables) => {
      return await client(await getAccessToken()).createTransaction(variables)
    },
    {
      onSuccess: () => {
        queryClient.resetQueries(USE_PORTFOLIO_HISTORY_QUERY_KEY)
      },
    },
  )

  return { transaction: data?.createTransaction, ...meta }
}

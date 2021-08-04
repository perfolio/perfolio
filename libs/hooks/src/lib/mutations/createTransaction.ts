import { useAccessToken } from "../queries/useAccessToken"
import { useMutation, useQueryClient } from "react-query"
import {
  CreateTransactionMutation,
  CreateTransactionMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { useClerk } from "@clerk/clerk-react"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries/useTransactions"
import { USE_PORTFOLIO_HISTORY_QUERY_KEY } from "../queries/usePortfolioHistory"
import { ensureAccessToken } from "../ensureAccessToken"

export const useCreateTransaction = () => {
  const { token } = useAccessToken()
  const queryClient = useQueryClient()
  const clerk = useClerk()
  const { data, ...meta } = useMutation<
    CreateTransactionMutation,
    Error,
    CreateTransactionMutationVariables
  >(
    async (variables) => {
      const accessToken = await ensureAccessToken(token, clerk.session?.id)
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

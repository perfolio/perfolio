import { useMutation, useQueryClient } from "react-query"
import {
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables,
} from "@perfolio/pkg/api/graphql"
import { client } from "../client"
import { USE_PORTFOLIO_HISTORY_QUERY_KEY } from "../queries/usePortfolioHistory"
import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/router"

export const useDeleteTransaction = () => {
  const { getAccessTokenSilently } = useAuth0()
  const router = useRouter()
  const queryClient = useQueryClient()
  const portfolioId = router.query["portfolioId"] as string
  const { data, ...meta } = useMutation<
    DeleteTransactionMutation,
    Error,
    DeleteTransactionMutationVariables
  >(
    async (variables) => {
      return client(await getAccessTokenSilently()).deleteTransaction(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_PORTFOLIO_HISTORY_QUERY_KEY(portfolioId))
      },
    },
  )

  return { transaction: data?.deleteTransaction, ...meta }
}

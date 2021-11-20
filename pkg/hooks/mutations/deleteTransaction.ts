import { useAuth0 } from "@auth0/auth0-react"
import { DeleteTransactionMutation, DeleteTransactionMutationVariables } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"
import { USE_PORTFOLIO_HISTORY_QUERY_KEY } from "../queries/usePortfolioHistory"

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

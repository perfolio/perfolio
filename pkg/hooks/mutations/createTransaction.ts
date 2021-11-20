import { useAuth0 } from "@auth0/auth0-react"
import { CreateTransactionMutation, CreateTransactionMutationVariables } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"
import { USE_PORTFOLIO_HISTORY_QUERY_KEY } from "../queries/usePortfolioHistory"

export const useCreateTransaction = () => {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"] as string
  const { data, ...meta } = useMutation<
    CreateTransactionMutation,
    Error,
    CreateTransactionMutationVariables
  >(
    async (variables) => {
      return await client(await getAccessTokenSilently()).createTransaction(variables)
    },
    {
      onSuccess: () => {
        queryClient.resetQueries(USE_PORTFOLIO_HISTORY_QUERY_KEY(portfolioId))
      },
    },
  )

  return { transaction: data?.createTransaction, ...meta }
}

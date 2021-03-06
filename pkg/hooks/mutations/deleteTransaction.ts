import { useAuth } from "@perfolio/pkg/auth"

import { DeleteTransactionMutation, DeleteTransactionMutationVariables } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"
import { USE_PORTFOLIO_QUERY_KEY } from "../queries/usePortfolio"

export const useDeleteTransaction = () => {
  const { getAccessToken } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const portfolioId = router.query["portfolioId"] as string
  const { data, ...meta } = useMutation<
    DeleteTransactionMutation,
    Error,
    DeleteTransactionMutationVariables
  >(
    async (variables) => {
      return client(await getAccessToken()).deleteTransaction(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_PORTFOLIO_QUERY_KEY(portfolioId))
      },
    },
  )

  return { transaction: data?.deleteTransaction, ...meta }
}

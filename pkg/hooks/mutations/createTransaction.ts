import {useAuth} from "@perfolio/pkg/auth"

import { CreateTransactionMutation, CreateTransactionMutationVariables } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"
import { USE_PORTFOLIO_QUERY_KEY } from "../queries/usePortfolio"

export const useCreateTransaction = () => {
  const { getAccessToken } = useAuth()
  const queryClient = useQueryClient()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"] as string
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
        queryClient.resetQueries(USE_PORTFOLIO_QUERY_KEY(portfolioId))
      },
    },
  )

  return { transaction: data?.createTransaction, ...meta }
}

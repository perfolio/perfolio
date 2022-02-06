import { useAuth } from "@perfolio/pkg/auth"

import { CreatePortfolioMutation, CreatePortfolioMutationVariables } from "@perfolio/pkg/api"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"

export const useCreatePortfolio = () => {
  const { getAccessToken } = useAuth()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    CreatePortfolioMutation,
    Error,
    CreatePortfolioMutationVariables
  >(
    async (variables) => {
      return await client(await getAccessToken()).createPortfolio(variables)
    },
    {
      onSuccess: () => {
        queryClient.resetQueries("USE_PORTFOLIOS_QUERY_KEY")
      },
    },
  )

  return { transaction: data?.createPortfolio, ...meta }
}

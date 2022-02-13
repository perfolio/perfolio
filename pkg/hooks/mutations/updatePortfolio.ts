import { useAuth } from "@perfolio/pkg/auth"

import { UpdatePortfolioMutation, UpdatePortfolioMutationVariables } from "@perfolio/pkg/api"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"

export const useUpdatePortfolio = () => {
  const { getAccessToken } = useAuth()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    UpdatePortfolioMutation,
    Error,
    UpdatePortfolioMutationVariables
  >(
    async (variables) => {
      return client(await getAccessToken()).updatePortfolio(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("USE_PORTFOLIOS_QUERY_KEY")
      },
    },
  )

  return { transaction: data?.updatePortfolio, ...meta }
}

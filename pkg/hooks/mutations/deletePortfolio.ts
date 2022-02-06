import { useAuth } from "@perfolio/pkg/auth"

import { DeletePortfolioMutation, DeletePortfolioMutationVariables } from "@perfolio/pkg/api"
import { useMutation, useQueryClient } from "react-query"
import { client } from "../client"

export const useDeletePortfolio = () => {
  const { getAccessToken } = useAuth()
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    DeletePortfolioMutation,
    Error,
    DeletePortfolioMutationVariables
  >(
    async (variables) => {
      return client(await getAccessToken()).deletePortfolio(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("USE_PORTFOLIOS_QUERY_KEY")
      },
    },
  )

  return { transaction: data?.deletePortfolio, ...meta }
}

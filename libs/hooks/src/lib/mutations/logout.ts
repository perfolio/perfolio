import { useMutation, useQueryClient } from "react-query"
import { USE_ACCESS_TOKEN_QUERY_KEY } from "../queries/useAccessToken"

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation(async () => await fetch("/api/auth/logout"), {
    onSuccess: () => {
      queryClient.resetQueries(USE_ACCESS_TOKEN_QUERY_KEY)
    },
  })
}

import { useAuthenticatedSession } from "blitz"
import { useQuery } from "react-query"

export const useUser = () => {
  const sess = useAuthenticatedSession()
  return useQuery(
    "USER",
    () => {
      return sess
    },
    {
      enabled: !!sess.userId,
      suspense: false,
    },
  )
}

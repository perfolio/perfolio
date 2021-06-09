import { useAuthenticatedSession, useQuery } from "blitz"
import getHistory from "../queries/getHistory"

export const useHistory = () => {
  const sess = useAuthenticatedSession()
  const [history, meta] = useQuery(
    getHistory,
    { userId: sess.userId },
    {
      enabled: !!sess.userId,
      suspense: false,
    },
  )
  return { history, ...meta }
}

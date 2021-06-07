import { useAuthenticatedSession, useQuery } from "blitz"
import getUser from "../queries/getUser"

export const useUser = () => {
  const sess = useAuthenticatedSession()
  const [user, meta] = useQuery(
    getUser,
    { userId: sess.userId },
    {
      enabled: !!sess.userId,
      suspense: false,
    },
  )
  return { user, ...meta }
}

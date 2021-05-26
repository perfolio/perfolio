import { useAuthenticatedSession, useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  useAuthenticatedSession()
  const [user] = useQuery(getCurrentUser, null)
  return user
}

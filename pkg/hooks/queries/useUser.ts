import { magic, useAuth } from "@perfolio/pkg/auth"
import { UserQuery } from "@perfolio/pkg/api"
import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { client } from "../client"
import { useEffect } from "react"
export const USE_USER_QUERY_KEY = "getUser"

export const useUser = () => {
  const { getAccessToken, getClaims } = useAuth()
  // const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const queryClient = useQueryClient()
  useEffect(() => {
    magic()
      .user.isLoggedIn()
      .then((res) => {
        setIsLoggedIn(res)
        queryClient.removeQueries(USE_USER_QUERY_KEY)
      })
      .catch((err) => {
        console.error("Unable to check if the user is logged in", err)
      })
  }, [queryClient])

  const { data, ...meta } = useQuery<UserQuery, Error>(
    USE_USER_QUERY_KEY,
    async () => {
      const token = await getAccessToken()
      const { sub } = await getClaims(token)
      return await client(token).user({ userId: sub })
    },
    { enabled: isLoggedIn },
  )

  return { user: data?.user, ...meta }
}

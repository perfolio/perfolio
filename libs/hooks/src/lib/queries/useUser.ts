import { useQuery } from "react-query"
import { UserQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"
export const USE_USER_QUERY_KEY = "getUser"

export const useUser = () => {
  const { getAccessToken, getClaims } = useAuth()

  const { data, ...meta } = useQuery<UserQuery, Error>(USE_USER_QUERY_KEY, async () => {
    const token = await getAccessToken()
    const claims = await getClaims(token)
    return await client(token).user({ userId: claims.sub })
  })

  return { user: data?.user, ...meta }
}

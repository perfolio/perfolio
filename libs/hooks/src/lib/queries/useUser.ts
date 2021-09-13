import { useQuery } from "react-query"
import { GetUserQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"
export const USE_USER_QUERY_KEY = "getUser"

export const useUser = () => {
  const { getAccessToken, getClaims } = useAuth()

  const { data, ...meta } = useQuery<GetUserQuery, Error>(USE_USER_QUERY_KEY, async () => {
    const token = await getAccessToken()
    const claims = await getClaims(token)
    return await client(token).getUser({ userId: claims.sub })
  })

  return { user: data?.getUser, ...meta }
}

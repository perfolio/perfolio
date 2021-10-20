import { useQuery } from "react-query"
import { UserQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"
export const USE_USER_QUERY_KEY = "getUser"

export const useUser = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const { data, ...meta } = useQuery<UserQuery, Error>(USE_USER_QUERY_KEY, async () => {
    const token = await getAccessTokenSilently()
    return await client(token).user({ userId: user!.sub! })
  })

  return { user: data?.user, ...meta }
}

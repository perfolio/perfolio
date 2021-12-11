import {useAuth} from "@perfolio/pkg/auth"

import { UserQuery } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"
export const USE_USER_QUERY_KEY = "getUser"

export const useUser = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const { data, ...meta } = useQuery<UserQuery, Error>(USE_USER_QUERY_KEY, async () => {
    const token = await getAccessToken()
    return await client(token).user({ userId: user!.sub! })
  })

  return { user: data?.user, ...meta }
}

import { useQuery } from "react-query"
import { GetUserQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"
export const USE_USER = "getUser"

export const useUser = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const { data, ...meta } = useQuery<GetUserQuery, Error>(
    USE_USER,
    async () => {
      const token = await getAccessTokenSilently()
      console.log({ token })
      return client(await getAccessTokenSilently()).getUser({ userId: user!.sub! })
    },
    {
      enabled: !!user?.sub,
    },
  )

  return { user: data?.getUser, ...meta }
}

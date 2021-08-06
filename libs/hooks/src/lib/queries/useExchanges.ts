import { useQuery } from "react-query"
import { GetExchangesQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"

export const useExchanges = () => {
  const { getAccessTokenSilently } = useAuth0()

  const { data, ...meta } = useQuery<GetExchangesQuery, Error>(["useExchanges"], async () =>
    client(await getAccessTokenSilently()).getExchanges(),
  )

  return { exchanges: data?.getExchanges, ...meta }
}

import { useQuery } from "react-query"
import { ExchangesQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"

export const useExchanges = () => {
  const { getAccessTokenSilently } = useAuth0()

  const { data, ...meta } = useQuery<ExchangesQuery, Error>(["useExchanges"], async () =>
    client(await getAccessTokenSilently()).exchanges(),
  )

  return { exchanges: data?.exchanges, ...meta }
}

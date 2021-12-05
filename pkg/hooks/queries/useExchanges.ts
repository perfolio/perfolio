import { useAuth0 } from "@auth0/auth0-react"
import { ExchangesQuery } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"

export const useExchanges = () => {
  const { getAccessTokenSilently } = useAuth0()

  const { data, ...meta } = useQuery<ExchangesQuery, Error>(["useExchanges"], async () =>
    client(await getAccessTokenSilently()).exchanges(),
  )

  return { exchanges: data?.exchanges, ...meta }
}

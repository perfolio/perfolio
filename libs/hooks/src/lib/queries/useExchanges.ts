import { useQuery } from "react-query"
import { ExchangesQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"

export const useExchanges = () => {
  const { getAccessToken } = useAuth()

  const { data, ...meta } = useQuery<ExchangesQuery, Error>(["useExchanges"], async () =>
    client(await getAccessToken()).exchanges(),
  )

  return { exchanges: data?.exchanges, ...meta }
}

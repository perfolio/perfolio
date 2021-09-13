import { useQuery } from "react-query"
import { GetExchangesQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"

export const useExchanges = () => {
  const { getAccessToken } = useAuth()

  const { data, ...meta } = useQuery<GetExchangesQuery, Error>(["useExchanges"], async () =>
    client(await getAccessToken()).getExchanges(),
  )

  return { exchanges: data?.getExchanges, ...meta }
}

import {useAuth} from "@perfolio/pkg/auth"

import { ExchangesQuery } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"

export const useExchanges = () => {
  const { getAccessToken } = useAuth()

  const { data, ...meta } = useQuery<ExchangesQuery, Error>(["useExchanges"], async () =>
    client(await getAccessToken()).exchanges(),
  )

  return { exchanges: data?.exchanges, ...meta }
}

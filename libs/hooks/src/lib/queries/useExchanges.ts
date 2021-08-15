import { useQuery } from "react-query"
import { GetExchangesQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAccessToken } from "./useAccessToken"

export const useExchanges = () => {
  const { accessToken } = useAccessToken()

  const { data, ...meta } = useQuery<GetExchangesQuery, Error>(
    ["useExchanges"],
    async () => client(accessToken).getExchanges(),
    { enabled: !!accessToken },
  )

  return { exchanges: data?.getExchanges, ...meta }
}

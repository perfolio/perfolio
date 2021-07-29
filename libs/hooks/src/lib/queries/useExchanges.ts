import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import { GetExchangesQuery } from "@perfolio/api/graphql"
import { client } from "../client"

export const useExchanges = () => {
  const { token } = useAccessToken()

  const { data, ...meta } = useQuery<GetExchangesQuery, Error>(
    ["useExchanges"],
    () => client(token!).getExchanges(),
    {
      enabled: !!token,
    },
  )

  return { exchanges: data?.getExchanges, ...meta }
}

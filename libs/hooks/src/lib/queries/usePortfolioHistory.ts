import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import { GetPortfolioHistoryQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useUser } from "@clerk/clerk-react"

export const usePortfolioHistory = () => {
  const { token } = useAccessToken()
  const user = useUser()
  const { data, ...meta } = useQuery<GetPortfolioHistoryQuery, Error>(
    ["usePortfolioHistory"],
    () => client(token!).getPortfolioHistory({ userId: user.id }),
    {
      enabled: !!token,
    },
  )

  return { portfolioHistory: data?.getPortfolioHistory, ...meta }
}

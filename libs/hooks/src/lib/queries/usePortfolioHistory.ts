import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import { GetPortfolioHistoryQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useUser } from "@clerk/clerk-react"

export const USE_PORTFOLIO_HISTORY_QUERY_KEY = "USE_PORTFOLIO_HISTORY_QUERY_KEY"

export const usePortfolioHistory = () => {
  const { token } = useAccessToken()
  const user = useUser()
  const { data, ...meta } = useQuery<GetPortfolioHistoryQuery, Error>(
    [USE_PORTFOLIO_HISTORY_QUERY_KEY],
    () => client(token!).getPortfolioHistory({ userId: user.id }),
    {
      enabled: !!token,
    },
  )

  return { portfolioHistory: data?.getPortfolioHistory ?? [], ...meta }
}

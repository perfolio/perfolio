import { useQuery } from "react-query"
import { GetPortfolioHistoryQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useUser } from "./useUser"
import { useAccessToken } from "./useAccessToken"
export const USE_PORTFOLIO_HISTORY_QUERY_KEY = "USE_PORTFOLIO_HISTORY_QUERY_KEY"

export const usePortfolioHistory = () => {
  const { user } = useUser()
  const { accessToken } = useAccessToken()
  const { data, ...meta } = useQuery<GetPortfolioHistoryQuery, Error>(
    [USE_PORTFOLIO_HISTORY_QUERY_KEY],
    async () => client(accessToken).getPortfolioHistory({ userId: user!.id! }),
    {
      enabled: !!user?.id && !!accessToken,
    },
  )

  return { portfolioHistory: data?.getPortfolioHistory ?? [], ...meta }
}

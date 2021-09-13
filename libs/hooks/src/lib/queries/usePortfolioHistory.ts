import { useQuery } from "react-query"
import { GetPortfolioHistoryQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"
export const USE_PORTFOLIO_HISTORY_QUERY_KEY = "USE_PORTFOLIO_HISTORY_QUERY_KEY"

export const usePortfolioHistory = () => {
  const { getAccessToken, getClaims } = useAuth()
  const { data, ...meta } = useQuery<GetPortfolioHistoryQuery, Error>(
    [USE_PORTFOLIO_HISTORY_QUERY_KEY],
    async () => {
      const token = await getAccessToken()
      const claims = await getClaims(token)
      return await client(token).getPortfolioHistory({ userId: claims.sub })
    },
  )

  return { portfolioHistory: data?.getPortfolioHistory ?? [], ...meta }
}

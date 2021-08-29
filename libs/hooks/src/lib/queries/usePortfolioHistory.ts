import { useQuery } from "react-query"
import { GetPortfolioHistoryQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"
export const USE_PORTFOLIO_HISTORY_QUERY_KEY = "USE_PORTFOLIO_HISTORY_QUERY_KEY"

export const usePortfolioHistory = () => {
  const { getAccessTokenSilently, user } = useAuth0()
  const { data, ...meta } = useQuery<GetPortfolioHistoryQuery, Error>(
    [USE_PORTFOLIO_HISTORY_QUERY_KEY],
    async () => client(await getAccessTokenSilently()).getPortfolioHistory({ userId: user!.sub! }),
    {
      enabled: !!user?.sub,
    },
  )

  return { portfolioHistory: data?.getPortfolioHistory ?? [], ...meta }
}

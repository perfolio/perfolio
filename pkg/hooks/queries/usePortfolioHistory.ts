import { useQuery } from "react-query"
import { PortfolioHistoryQuery } from "@perfolio/pkg/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/router"
export const USE_PORTFOLIO_HISTORY_QUERY_KEY = (portfolioId: string) =>
  `USE_PORTFOLIO_HISTORY_QUERY_KEY_${portfolioId}`

export const usePortfolioHistory = (portfolioId?: string) => {
  const { getAccessTokenSilently } = useAuth0()
  const router = useRouter()
  if (!portfolioId) {
    portfolioId = router.query["portfolioId"] as string
  }
  const { data, ...meta } = useQuery<PortfolioHistoryQuery, Error>(
    [USE_PORTFOLIO_HISTORY_QUERY_KEY(portfolioId)],
    async () => {
      const token = await getAccessTokenSilently()
      return await client(token).portfolioHistory({ portfolioId: portfolioId! })
    },
  )

  return { portfolioHistory: data?.portfolio?.absoluteHistory ?? [], ...meta }
}

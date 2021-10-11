import { useQuery } from "react-query"
import { PortfolioHistoryQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAccessToken } from "@perfolio/auth"
import { useRouter } from "next/router"
export const USE_PORTFOLIO_HISTORY_QUERY_KEY = "USE_PORTFOLIO_HISTORY_QUERY_KEY"

export const usePortfolioHistory = () => {
  const { getAccessToken } = useAccessToken()
  const router = useRouter()
  const portfolioId = router.query.portfolioId as string
  const { data, ...meta } = useQuery<PortfolioHistoryQuery, Error>(
    [USE_PORTFOLIO_HISTORY_QUERY_KEY],
    async () => {
      const token = await getAccessToken()
      return await client(token).portfolioHistory({ portfolioId })
    },
  )

  return { portfolioHistory: data?.portfolio?.absoluteHistory ?? [], ...meta }
}

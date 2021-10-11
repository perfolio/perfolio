import { PortfolioQuery } from "@perfolio/api/graphql"
import { useQuery } from "react-query"
import { useAccessToken } from "@perfolio/auth"
import { client } from "../client"
import { useRouter } from "next/router"

const USE_PORTFOLIO_QUERY_KEY = (portfolioId: string) => `USE_PORTFOLIO_QUERY_KEY_${portfolioId}`

export const usePortfolio = () => {
  const { getAccessToken } = useAccessToken()
  const router = useRouter()
  const portfolioId = router.query.portfolioId as string
  const { data, ...meta } = useQuery<PortfolioQuery, Error>(
    USE_PORTFOLIO_QUERY_KEY(portfolioId),
    async () => client(await getAccessToken()).portfolio({ portfolioId }),
  )
  return { portfolio: data?.portfolio, ...meta }
}

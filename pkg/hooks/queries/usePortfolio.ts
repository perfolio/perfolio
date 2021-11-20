import { useAuth0 } from "@auth0/auth0-react"
import { PortfolioQuery } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { client } from "../client"

const USE_PORTFOLIO_QUERY_KEY = (portfolioId: string) => `USE_PORTFOLIO_QUERY_KEY_${portfolioId}`

export const usePortfolio = () => {
  const { getAccessTokenSilently } = useAuth0()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"] as string
  const { data, ...meta } = useQuery<PortfolioQuery, Error>(
    USE_PORTFOLIO_QUERY_KEY(portfolioId),
    async () => client(await getAccessTokenSilently()).portfolio({ portfolioId }),
    {
      enabled: !!portfolioId,
    },
  )
  return { portfolio: data?.portfolio, ...meta }
}

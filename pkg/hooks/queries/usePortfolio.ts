import { useAuth0 } from "@auth0/auth0-react"
import { PortfolioQuery } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { client } from "../client"

export const USE_PORTFOLIO_QUERY_KEY = (
  portfolioId: string,
  withHistory: boolean,
) => `USE_PORTFOLIO_QUERY_KEY_${portfolioId}_${withHistory}`

export const usePortfolio = (opts: { withHistory: boolean } = { withHistory: false }) => {
  const { getAccessTokenSilently } = useAuth0()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"] as string
  const { data, ...meta } = useQuery<PortfolioQuery, Error>(
    USE_PORTFOLIO_QUERY_KEY(portfolioId, opts.withHistory),
    async () =>
      client(await getAccessTokenSilently()).portfolio({
        portfolioId,
        withHistory: opts.withHistory,
      }),
    {
      enabled: !!portfolioId,
    },
  )
  return { portfolio: data?.portfolio, ...meta }
}

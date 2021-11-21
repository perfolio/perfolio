import { useAuth0 } from "@auth0/auth0-react"
import { PortfolioQuery } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { client } from "../client"

export const USE_PORTFOLIO_QUERY_KEY = (
  portfolioId: string,
  withHistorySince: number | null,
) => `USE_PORTFOLIO_QUERY_KEY_${portfolioId}_${withHistorySince}`

export const usePortfolio = (
  opts: { since: number | null } = { since: null },
) => {
  const { getAccessTokenSilently } = useAuth0()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"] as string
  const { data, ...meta } = useQuery<PortfolioQuery, Error>(
    USE_PORTFOLIO_QUERY_KEY(portfolioId, opts.since),
    async () =>
      client(await getAccessTokenSilently()).portfolio({
        portfolioId,
        since: opts.since ?? undefined,
      }),
    {
      enabled: !!portfolioId,
    },
  )
  return { portfolio: data?.portfolio, ...meta }
}

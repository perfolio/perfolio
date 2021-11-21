import { useAuth0 } from "@auth0/auth0-react"
import { PortfolioHistoryQuery } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { client } from "../client"

export const usePortfolioHistory = (opts?: {
  portfolioId?: string
  since?: number
}) => {
  const { getAccessTokenSilently } = useAuth0()
  const router = useRouter()
  const portfolioId = opts?.portfolioId ?? (router.query["portfolioId"] as string)
  const { data, ...meta } = useQuery<PortfolioHistoryQuery, Error>(
    ["PORTFOLIO", portfolioId, "HISTORY", opts?.since],
    async () =>
      client(await getAccessTokenSilently()).portfolioHistory({
        portfolioId,
        since: opts?.since,
      }),
    {
      enabled: !!portfolioId,
    },
  )

  return {
    history: {
      relative: data?.portfolio?.relativeHistory ?? [],
      absolute: data?.portfolio?.absoluteHistory ?? [],
    },
    ...meta,
  }
}

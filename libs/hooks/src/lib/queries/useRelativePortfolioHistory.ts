import { useQuery } from "react-query"
import { client } from "../client"
import { useAccessToken } from "@perfolio/auth"
import { useRouter } from "next/router"
export const USE_RELATIVE_PORTFOLIO_HISTORY = "USE_RELATIVE_PORTFOLIO_HISTORY"

export const useRelativePortfolioHistory = (since?: number) => {
  const { getAccessToken } = useAccessToken()
  const router = useRouter()
  const portfolioId = router.query.portfolioId as string
  const { data, ...meta } = useQuery([USE_RELATIVE_PORTFOLIO_HISTORY, { since }], async () => {
    const token = await getAccessToken()
    return await client(token).relativePortfolioHistory({ portfolioId, since })
  })

  return { relativePortfolioHistory: data?.portfolio?.relativeHistory ?? [], ...meta }
}

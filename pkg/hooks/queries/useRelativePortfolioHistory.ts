import { useAuth0, } from "@auth0/auth0-react"
import { useRouter, } from "next/router"
import { useQuery, } from "react-query"
import { client, } from "../client"
export const USE_RELATIVE_PORTFOLIO_HISTORY = "USE_RELATIVE_PORTFOLIO_HISTORY"

export const useRelativePortfolioHistory = (since?: number,) => {
  const { getAccessTokenSilently, } = useAuth0()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"] as string
  const { data, ...meta } = useQuery([USE_RELATIVE_PORTFOLIO_HISTORY, { since, },], async () => {
    const token = await getAccessTokenSilently()
    return await client(token,).relativePortfolioHistory({ portfolioId, since, },)
  },)

  return { relativePortfolioHistory: data?.portfolio?.relativeHistory ?? [], ...meta, }
}

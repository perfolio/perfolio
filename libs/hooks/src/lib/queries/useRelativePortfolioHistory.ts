import { useQuery } from "react-query"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"
export const USE_RELATIVE_PORTFOLIO_HISTORY = "USE_RELATIVE_PORTFOLIO_HISTORY"

export const useRelativePortfolioHistory = (since?: number) => {
  const { getAccessToken, getClaims } = useAuth()
  const { data, ...meta } = useQuery([USE_RELATIVE_PORTFOLIO_HISTORY, { since }], async () => {
    const token = await getAccessToken()
    const claims = await getClaims(token)
    return await client(token).getRelativePortfolioHistory({ userId: claims.sub, since })
  })

  return { relativePortfolioHistory: data?.getRelativePortfolioHistory ?? [], ...meta }
}

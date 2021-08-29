import { useQuery } from "react-query"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"
export const USE_RELATIVE_PORTFOLIO_HISTORY = "USE_RELATIVE_PORTFOLIO_HISTORY"

export const useRelativePortfolioHistory = (since?: number) => {
  const { getAccessTokenSilently, user } = useAuth0()
  const { data, ...meta } = useQuery(
    [USE_RELATIVE_PORTFOLIO_HISTORY, { since }],
    async () =>
      await client(await getAccessTokenSilently()).getRelativePortfolioHistory({
        userId: user!.sub!,
        since,
      }),
    {
      enabled: !!user?.sub,
    },
  )

  return { relativePortfolioHistory: data?.getRelativePortfolioHistory ?? [], ...meta }
}

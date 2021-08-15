import { useQuery } from "react-query"
import { client } from "../client"
import { useAccessToken } from "./useAccessToken"
import { useUser } from "@auth0/nextjs-auth0"
export const USE_RELATIVE_PORTFOLIO_HISTORY = "USE_RELATIVE_PORTFOLIO_HISTORY"

export const useRelativePortfolioHistory = (since?: number) => {
  const { user } = useUser()
  const { accessToken } = useAccessToken()
  const { data, ...meta } = useQuery(
    [USE_RELATIVE_PORTFOLIO_HISTORY, { since }],
    async () =>
      await client(accessToken).getRelativePortfolioHistory({
        userId: user!.sub!,
        since,
      }),
    {
      enabled: !!user?.sub && !!accessToken,
    },
  )

  return { relativePortfolioHistory: data?.getRelativePortfolioHistory ?? [], ...meta }
}

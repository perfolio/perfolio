import { useQuery } from "react-query"
import { client } from "../client"
import { useAccessToken } from "./useAccessToken"
import { useUser } from "./useUser"
export const USE_RELATIVE_PORTFOLIO_HISTORY = "USE_RELATIVE_PORTFOLIO_HISTORY"

export const useRelativePortfolioHistory = (since?: number) => {
  const { user } = useUser()
  const { accessToken } = useAccessToken()
  const { data, ...meta } = useQuery(
    [USE_RELATIVE_PORTFOLIO_HISTORY, { since }],
    async () =>
      await client(accessToken).getRelativePortfolioHistory({
        userId: user!.id!,
        since,
      }),
    {
      enabled: !!user?.id && !!accessToken,
    },
  )

  return { relativePortfolioHistory: data?.getRelativePortfolioHistory ?? [], ...meta }
}

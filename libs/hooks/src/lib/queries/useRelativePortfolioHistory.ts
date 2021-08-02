import { useQuery } from "react-query"
import { client } from "../client"

import { useAccessToken } from "./useAccessToken"
import { useUser } from "@clerk/clerk-react"
export const USE_RELATIVE_PORTFOLIO_HISTORY = "USE_RELATIVE_PORTFOLIO_HISTORY"

export const useRelativePortfolioHistory = () => {
  const { token } = useAccessToken()
  const user = useUser()
  const { data, ...meta } = useQuery(
    [USE_RELATIVE_PORTFOLIO_HISTORY],
    async () => await client(token!).getRelativePortfolioHistory({ userId: user.id }),
  )

  return { relativePortfolioHistory: data?.getRelativePortfolioHistory ?? [], ...meta }
}

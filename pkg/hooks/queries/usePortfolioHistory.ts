import { useAuth } from "@perfolio/pkg/auth"

import { PortfolioHistoryQuery } from "@perfolio/pkg/api"
import { useRouter } from "next/router"
import { useQuery, useQueryClient } from "react-query"
import { client } from "../client"

function queryKey(portfolioId: string, since: number | undefined): unknown[] {
  return ["PORTFOLIO", portfolioId, "HISTORY", since]
}

export const usePortfolioHistory = (opts?: { portfolioId?: string; since?: number }) => {
  const { getAccessToken } = useAuth()
  const router = useRouter()
  const portfolioId = opts?.portfolioId ?? (router.query["portfolioId"] as string)
  const { data, ...meta } = useQuery<PortfolioHistoryQuery, Error>(
    queryKey(portfolioId, opts?.since),
    async () =>
      client(await getAccessToken()).portfolioHistory({
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

export const usePrefetchPortfolioHistory = (sinceArr: number[]) => {
  const { getAccessToken } = useAuth()

  const queryClient = useQueryClient()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"]
  if (typeof portfolioId === "string") {
    sinceArr.forEach((since) => {
      queryClient.prefetchQuery(queryKey(portfolioId, since), async () =>
        client(await getAccessToken()).portfolioHistory({
          portfolioId,
          since,
        }),
      )
    })
  }
}

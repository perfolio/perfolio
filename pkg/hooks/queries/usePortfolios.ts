import {useAuth} from "@perfolio/pkg/auth"

import { GetUserPortfoliosQuery } from "@perfolio/pkg/api"
import { useQuery } from "react-query"
import { client } from "../client"

const USE_PORTFOLIOS_QUERY_KEY = "USE_PORTFOLIOS_QUERY_KEY"

export const usePortfolios = () => {
  const { getAccessToken, getClaims } = useAuth()

  const { data, ...meta } = useQuery<GetUserPortfoliosQuery, Error>(
    USE_PORTFOLIOS_QUERY_KEY,
    async () => {
      const token = await getAccessToken()
      const {sub} = await getClaims(token)
      return client(token).getUserPortfolios({ userId: sub })
    },
  )
  return { portfolios: data?.user?.portfolios ?? [], ...meta }
}

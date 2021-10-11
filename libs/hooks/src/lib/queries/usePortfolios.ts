import { GetUserPortfoliosQuery } from "@perfolio/api/graphql"
import { useQuery } from "react-query"
import { useAccessToken } from "@perfolio/auth"
import { client } from "../client"

const USE_PORTFOLIOS_QUERY_KEY = "USE_PORTFOLIOS_QUERY_KEY"

export const usePortfolios = () => {
  const { getAccessToken, getClaims } = useAccessToken()

  const { data, ...meta } = useQuery<GetUserPortfoliosQuery, Error>(
    USE_PORTFOLIOS_QUERY_KEY,
    async () => {
      const token = await getAccessToken()
      const claims = await getClaims(token)
      return client(token).getUserPortfolios({ userId: claims.sub })
    },
  )
  return { portfolios: data?.user?.portfolios ?? [], ...meta }
}

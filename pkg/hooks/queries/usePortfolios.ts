import { useAuth0, } from "@auth0/auth0-react"
import { GetUserPortfoliosQuery, } from "@perfolio/pkg/api/graphql"
import { useQuery, } from "react-query"
import { client, } from "../client"

const USE_PORTFOLIOS_QUERY_KEY = "USE_PORTFOLIOS_QUERY_KEY"

export const usePortfolios = () => {
  const { getAccessTokenSilently, user, } = useAuth0()

  const { data, ...meta } = useQuery<GetUserPortfoliosQuery, Error>(
    USE_PORTFOLIOS_QUERY_KEY,
    async () => {
      const token = await getAccessTokenSilently()
      return client(token,).getUserPortfolios({ userId: user!.sub!, },)
    },
  )
  return { portfolios: data?.user?.portfolios ?? [], ...meta, }
}

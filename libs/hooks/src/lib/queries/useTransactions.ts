import { useQuery } from "react-query"
import { GetTransactionsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth } from "@perfolio/auth"
export const USE_TRANSACTIONS_QUERY_KEY = "getTransactions"

export const useTransactions = () => {
  const { getAccessToken, getClaims } = useAuth()

  const { data, ...meta } = useQuery<GetTransactionsQuery, Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    async () => {
      const token = await getAccessToken()
      const claims = await getClaims(token)
      return await client(token).getTransactions({ userId: claims.sub })
    },
  )

  return { transactions: data?.getTransactions, ...meta }
}

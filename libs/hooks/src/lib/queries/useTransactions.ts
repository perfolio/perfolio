import { useQuery } from "react-query"
import { GetTransactionsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useUser } from "@auth0/nextjs-auth0"
import { useAccessToken } from "./useAccessToken"
export const USE_TRANSACTIONS_QUERY_KEY = "getTransactions"

export const useTransactions = () => {
  const { user } = useUser()
  const { accessToken } = useAccessToken()

  const { data, ...meta } = useQuery<GetTransactionsQuery, Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    async () => client(accessToken).getTransactions({ userId: user!.sub! }),
    {
      enabled: !!user?.sub && !!accessToken,
    },
  )

  return { transactions: data?.getTransactions, ...meta }
}

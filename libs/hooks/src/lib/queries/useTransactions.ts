import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import { GetTransactionsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useUser } from "@clerk/clerk-react"

export const USE_TRANSACTIONS_QUERY_KEY = "getTransactions"

export const useTransactions = () => {
  const { token } = useAccessToken()
  const user = useUser()

  const { data, ...meta } = useQuery<GetTransactionsQuery, Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    () => client(token!).getTransactions({ userId: user.id }),
    {
      enabled: !!token,
    },
  )

  return { transactions: data?.getTransactions, ...meta }
}

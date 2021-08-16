import { useQuery } from "react-query"
import { GetTransactionsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useUser } from "./useUser"
import { useAccessToken } from "./useAccessToken"
export const USE_TRANSACTIONS_QUERY_KEY = "getTransactions"

export const useTransactions = () => {
  const { user } = useUser()
  const { accessToken } = useAccessToken()

  const { data, ...meta } = useQuery<GetTransactionsQuery, Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    async () => client(accessToken).getTransactions({ userId: user!.id! }),
    {
      enabled: !!user?.id && !!accessToken,
    },
  )

  return { transactions: data?.getTransactions, ...meta }
}

import { useQuery } from "react-query"
import { GetTransactionsQuery } from "@perfolio/api/graphql"
import { client } from "../client"
import { useAuth0 } from "@auth0/auth0-react"

export const USE_TRANSACTIONS_QUERY_KEY = "getTransactions"

export const useTransactions = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const { data, ...meta } = useQuery<GetTransactionsQuery, Error>(
    USE_TRANSACTIONS_QUERY_KEY,
    async () => client(await getAccessTokenSilently()).getTransactions({ userId: user!.sub! }),
    {
      enabled: !!user?.sub,
    },
  )

  return { transactions: data?.getTransactions, ...meta }
}

import { useMutation, useQueryClient } from "react-query"
import {
  SubscribeToNewsletterMutationMutation,
  SubscribeToNewsletterMutationMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"
import { USE_TRANSACTIONS_QUERY_KEY } from "../queries/useTransactions"

export const useSubscribeToNewsletter = () => {
  const queryClient = useQueryClient()
  const { data, ...meta } = useMutation<
    SubscribeToNewsletterMutationMutation,
    Error,
    SubscribeToNewsletterMutationMutationVariables
  >(
    async (variables) => {
      return client().SubscribeToNewsletterMutation(variables)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USE_TRANSACTIONS_QUERY_KEY)
      },
    },
  )

  return { id: data?.subscribeToNewsletter, ...meta }
}

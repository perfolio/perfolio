import { useMutation } from "react-query"
import {
  SubscribeToNewsletterMutationMutation,
  SubscribeToNewsletterMutationMutationVariables,
} from "@perfolio/api/graphql"
import { client } from "../client"

export const useSubscribeToNewsletter = () => {
  const { data, ...meta } = useMutation<
    SubscribeToNewsletterMutationMutation,
    Error,
    SubscribeToNewsletterMutationMutationVariables
  >(async (variables) => {
    return client().SubscribeToNewsletterMutation(variables)
  })

  return { id: data?.subscribeToNewsletter, ...meta }
}

import { useMutation } from "react-query"
import {
  SubscribeToNewsletterMutation,
  SubscribeToNewsletterMutationVariables,
} from "@perfolio/pkg/api/graphql"
import { client } from "../client"
export const useSubscribeToNewsletter = () => {
  const { data, ...meta } = useMutation<
    SubscribeToNewsletterMutation,
    Error,
    SubscribeToNewsletterMutationVariables
  >(async (variables) => {
    return client().subscribeToNewsletter(variables)
  })

  return { settings: data?.subscribeToNewsletter, ...meta }
}

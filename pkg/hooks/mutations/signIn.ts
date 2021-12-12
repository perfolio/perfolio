import { SignInMutation, SignInMutationVariables } from "@perfolio/pkg/api"
import { useMutation } from "react-query"
import { client } from "../client"
export const useSignIn = () => {
  const { data, ...meta } = useMutation<SignInMutation, Error, SignInMutationVariables>(
    async (variables) => {
      return client().signIn(variables)
    },
  )

  return { ...meta }
}

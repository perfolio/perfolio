import { useMutation } from "react-query"
import { Api } from "@perfolio/api-client"
import { SubscribeRequest } from "@perfolio/lambda"

export function useSubscribe() {
  return useMutation<void, Error, SubscribeRequest>({
    mutationFn: (variables: SubscribeRequest) => new Api().emails.subscribe(variables),
  })
}

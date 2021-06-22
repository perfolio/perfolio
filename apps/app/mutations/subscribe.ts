import { useMutation } from "react-query"
import { useApi } from "@perfolio/data-access/api-client"
import { SubscribeRequest } from "@perfolio/api/feature/lambda"

export function useSubscribe() {
  const api = useApi()

  return useMutation<void, Error, SubscribeRequest>({
    mutationFn: (variables: SubscribeRequest) => api.emails.subscribe(variables),
  })
}

import { Transaction } from "@perfolio/db"
import { useMutation } from "react-query"
import { request } from "@perfolio/api"
import { SubscribeRequestValidation, SubscribeRequest } from "../pages/api/email/subscribe"

export function useSubscribe() {
  return useMutation<Transaction, Error, SubscribeRequest>({
    mutationFn: (variables: SubscribeRequest) => {
      return request<Transaction>({
        path: "/api/email/subscribe",
        body: SubscribeRequestValidation.parse(variables),
      })
    },
  })
}

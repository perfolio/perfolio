import { useMutation, invalidateQuery } from "blitz"
import createTransactionMutation from "app/transactions/mutations/createTransaction"
import getTransactions from "app/transactions/queries/getTransactions"

export const useCreateTransaction = () => {
  const [createTransaction, meta] = useMutation(createTransactionMutation, {
    onSuccess: () => {
      invalidateQuery(getTransactions)
    },
  })
  return { createTransaction, ...meta }
}

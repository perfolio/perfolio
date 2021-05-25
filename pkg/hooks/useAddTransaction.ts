import { useMutation, useQueryClient, UseMutationResult } from "react-query"
import { useRouter } from "next/router"
export interface UseAddTransactionRequest {
  assetId: string
  quantity: number
  value: number

  // Unix timestamp with second precission
  executedAt: number
}

/**
 *Fetches data to render a barchart.
 */

export const useAddTransaction = (): UseMutationResult<
  UseAddTransactionRequest,
  Error,
  UseAddTransactionRequest,
  any
> => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(
    (req: UseAddTransactionRequest) =>
      fetch("/api/service/vault/transactions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getTransactions"])
        router.push("/transactions")
      },
    },
  )
}

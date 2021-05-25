import { Time } from "pkg/time"
import { useQuery } from "react-query"

interface UsePriceRequest {
  time: Time
  isin: string
}

interface UsePriceResponse {
  isLoading: boolean
  error: Error | null
  data: number | undefined
}

/**
 *Fetches data to render a barchart.
 */
export function usePrice(req: UsePriceRequest): UsePriceResponse {
  const { data, isLoading, error } = useQuery<{ value: number }, Error>(
    ["getPrice", req],
    async () => {
      return fetch(
        `/api/service/iexcloud/prices/${req.isin}/${req.time.unix()}`,
      ).then((res) => res.json())
    },
    {
      enabled:
        !!req.isin &&
        !!req.time &&
        req.time.day > 0 &&
        req.time.month > 0 &&
        req.time.year > 0,
    },
  )
  return {
    isLoading,
    error,
    data: data ? data.value : undefined,
  }
}

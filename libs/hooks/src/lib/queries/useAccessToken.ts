import { JWT } from "@perfolio/auth"
import { Time } from "@perfolio/util/time"
import { useQuery, useQueryClient } from "react-query"

export const USE_ACCESS_TOKEN_QUERY_KEY = "ACCESS_TOKEN"

export function useAccessToken() {
  const queryClient = useQueryClient()

  const { data, ...meta } = useQuery<{ accessToken: string }, Error>(
    USE_ACCESS_TOKEN_QUERY_KEY,
    async () => {
      const res = await fetch("/api/auth/refresh")
      if (!res.ok) {
        throw new Error(`Unable to reach token endpoint`)
      }
      return await res.json()
    },
    {
      retry: false,
      cacheTime: Time.toSeconds("4m"), // 1 minute less than the jwt expiry time
      staleTime: Time.toSeconds("4m"),
    },
  )

  /**
   * Automatically invalidate expired tokens
   */
  if (data?.accessToken) {
    const { exp } = JWT.decode(data.accessToken)
    if (exp < Date.now() / 1000 - 10) {
      queryClient.invalidateQueries(USE_ACCESS_TOKEN_QUERY_KEY)
    }
  }

  return { accessToken: data?.accessToken, ...meta }
}

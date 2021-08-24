import { JWT } from "@perfolio/auth"
import { Time } from "@perfolio/util/time"
import { useQuery, useQueryClient } from "react-query"

export const USE_ACCESS_TOKEN_QUERY_KEY = "ACCESS_TOKEN"

export function useAccessToken() {
  const queryClient = useQueryClient()

  const { data, ...meta } = useQuery<{ accessToken: string }, Error>(
    USE_ACCESS_TOKEN_QUERY_KEY,
    async () => {
      /**
       * If the cached access token has not expired yet we can simply return it
       * without fetching a new one
       */
      const cached = queryClient.getQueryData<{ accessToken: string }>(USE_ACCESS_TOKEN_QUERY_KEY)

      if (cached && !JWT.isExpired(cached.accessToken)) {
        return cached
      }

      const res = await fetch("/api/auth/refresh")
      if (!res.ok) {
        throw new Error(`Unable to reach token endpoint`)
      }
      const { accessToken } = (await res.json()) as { accessToken: string }
      return { accessToken }
    },
    {
      cacheTime: Time.toSeconds("5m"),
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

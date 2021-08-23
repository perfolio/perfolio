import { useRouter } from "next/router"
import { useQuery } from "react-query"

export const USE_ACCESS_TOKEN_QUERY_KEY = "ACCESS_TOKEN"

export function useAccessToken(opts: { redirectTo: string } = { redirectTo: "/auth/sign-in" }) {
  const router = useRouter()
  const { data, ...meta } = useQuery<{ accessToken: string }, Error>(
    USE_ACCESS_TOKEN_QUERY_KEY,
    async () => {
      const res = await fetch("/api/auth/refresh")
      console.log({ res })
      if (!res.ok) {
        throw new Error(`Unable to reach token endpoint`)
      }
      return await res.json()
    },
    {
      staleTime: 4 * 60 * 1000,
      cacheTime: 4 * 60 * 1000,
      onSettled(data) {
        if (!data) {
          console.log("settled", { data })
          router.push(opts.redirectTo)
        }
      },
    },
  )
  return { accessToken: data?.accessToken, ...meta }
}

import { useQuery } from "react-query"

export function useAccessToken() {
  const { data, ...meta } = useQuery<{ accessToken: string }, Error>(
    "GET_ACCESS_TOKEN",
    async () => {
      const res = await fetch("/api/auth/access-token")

      if (!res.ok) {
        throw new Error(`Unable to reach token endpoint`)
      }
      return await res.json()
    },
    { staleTime: 4 * 60 * 1000, cacheTime: 4 * 60 * 1000 },
  )
  return { accessToken: data?.accessToken, ...meta }
}

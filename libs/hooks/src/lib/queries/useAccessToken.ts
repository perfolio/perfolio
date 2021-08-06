import { useAuth0 } from "@auth0/auth0-react"
export function useAccessToken() {
  const { getAccessTokenSilently } = useAuth0()

  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
  if (!audience) {
    throw new Error(`NEXT_PUBLIC_AUTH0_AUDIENCE env missing`)
  }

  return {
    getAccessToken: () =>
      getAccessTokenSilently({
        audience,
      }),
  }
}

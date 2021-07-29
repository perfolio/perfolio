import { JWTContext } from "@perfolio/api/client"
import { useContext } from "react"
import { useQuery } from "react-query"
import { useClerk } from "@clerk/clerk-react"
import { ensureAccessToken } from "../ensureAccessToken"
/**
 * Load a token from memory or fetch a new one if necessary
 * @returns A valid access token
 */
export function useAccessToken() {
  const clerk = useClerk()
  const { token, setToken } = useContext(JWTContext)

  const { data, ...meta } = useQuery<string | undefined, Error>("accessToken", async () => {
    const accessToken = await ensureAccessToken(token, clerk.session?.id)
    setToken(accessToken)
    return accessToken
  })
  return { token: data, ...meta }
}

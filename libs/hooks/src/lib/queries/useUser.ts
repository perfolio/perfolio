import { useAccessToken } from "./useAccessToken"
import { JWT } from "@perfolio/auth"

/**
 * Loads the user data
 * @returns
 */
export const useUser = () => {
  const { accessToken, ...meta } = useAccessToken()

  if (!accessToken) {
    return { user: { id: "" }, ...meta }
  }
  const claims = JWT.decode(accessToken)

  return { user: { id: claims.sub }, ...meta }
}

import { HTTPError, JsonUnmarshalError, AuthenticationError } from "@perfolio/util/errors"
import { JWT } from "@perfolio/auth"
const getNewToken = async (sessionId: string): Promise<string> => {
  const path = "/api/auth/access-token"
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ sessionId }),
  })
  if (!res.ok) {
    throw new HTTPError(res.status, path)
  }

  const { accessToken } = await res.json().catch((err) => {
    throw new JsonUnmarshalError(err)
  })
  return accessToken
}

/**
 * Validates the token and fetches a new one if necessary
 */
export async function ensureAccessToken(
  token: string | undefined | null,
  sessionId: string | undefined | null,
): Promise<string> {
  if (token && JWT.expiresIn(token) > 10) {
    return token
  }
  if (!sessionId) {
    throw new AuthenticationError("No session id found")
  }
  return await getNewToken(sessionId)
}

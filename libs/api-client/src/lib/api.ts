import { HTTPRequestError, JsonUnmarshalError } from "./errors"

/**
 * Generic api request to be extended by other request types.
 */
export interface ApiRequest {
  /**
   * JWT token to authenticate the current user.
   */
  token?: string

  /**
   * Url path appended to the baseUrl.
   */
  path: string

  /**
   * Send a body with the request. Must be json serializable.
   */
  body?: unknown
}

/**
 * Make a post request to a serverless function
 *
 * Takes the access token from context by default.
 * @param body
 * @param token - Overwrite default token getter.
 */
export async function request<ResponseType>({
  token,
  path,
  body,
}: ApiRequest): Promise<ResponseType> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = token
  }

  const res = await fetch(path, {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status !== 200) {
    throw new HTTPRequestError(
      `Unable to POST to endpoint ${path}, failed with status: ${res.status}`,
    )
  }
  return res.json().catch((err) => {
    throw new JsonUnmarshalError(err)
  })
}

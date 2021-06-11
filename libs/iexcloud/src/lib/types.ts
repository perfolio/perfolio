/**
 * Generic api request to be extended by other request types.
 */
export interface ApiRequest {
  /**
   * Access token to authenticate the current user.
   */
  token?: string
}

/**
 * Configuration to create a new api instance.
 */
export interface ApiConfig {
  /**
   * Sets the base url where paths are appended.
   */
  baseUrl?: string

  /**
   * Set a JWT to be used when requesting resources from the server.
   */
  token?: string
}

export interface GetRequest extends ApiRequest {
  /**
   * Url path appended to the baseUrl.
   */
  path: string

  /**
   * Query parameters.
   */
  parameters?: Record<string, string | number | undefined>
}

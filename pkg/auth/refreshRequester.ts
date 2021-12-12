import { magic } from "."
import { client } from "../hooks/client"

/**
 * Use this class to make sure to guarantee that only a single refresh token request
 * is sent at a time.
 * If we would send multiple requests in parallel the returned Set-Cookie header will cause
 * lots of issues because with every refresh request a new refresh token is generated and saved
 * as cookie.
 */
export class TokenRefreshRequester {
  private static instance: TokenRefreshRequester
  private inflightRequest: Promise<{ accessToken: string }> | null

  private constructor() {
    this.inflightRequest = null
  }

  /**
   * Return a reference to the singleton
   */
  public static new() {
    if (!TokenRefreshRequester.instance) {
      TokenRefreshRequester.instance = new TokenRefreshRequester()
    }
    return TokenRefreshRequester.instance
  }

  /**
   * Await the inflight request and delete the reference after it is done.
   * @returns The resolved promise
   */
  private async closeCurrentRequest(): Promise<{ accessToken: string }> {
    if (!this.inflightRequest) {
      throw new Error(`There is no request currently in flight`)
    }

    const res = await this.inflightRequest
    this.inflightRequest = null
    return res
  }

  /**
   * Perform the actual http request
   */
  private async makeRequest(): Promise<{ accessToken: string }> {
    const didToken = await magic()
      .user.getIdToken()
      .catch((err) => {
        throw new Error(`Unable to get idToken: ${err}`)
      })

    const res = await client().refresh({ didToken })

    return { accessToken: res.refresh }
  }

  /**
   * Refresh the access token.
   * If a request is currently in flight it will not send additional requests but return
   * the previous promise instead.
   */
  public async refreshAccessToken(): Promise<{ accessToken: string }> {
    if (!this.inflightRequest) {
      this.inflightRequest = this.makeRequest()
    }
    return await this.closeCurrentRequest()
  }
}

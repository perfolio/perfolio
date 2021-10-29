import { env } from "@chronark/env"
import { HttpError } from "@perfolio/pkg/util/errors"
import { ApiConfig, PostRequest } from "./types"
import { Logger } from "@perfolio/pkg/logger"
/**
 * SDK for OpenFigi resources.
 */
export class Client {
  private readonly baseUrl: string
  private readonly token: string
  private readonly logger: Logger

  constructor(config?: ApiConfig) {
    this.baseUrl = config?.baseUrl ?? "https://api.openfigi.com"

    const token = config?.token ?? env.require("OPENFIGI_API_KEY")

    this.token = token
    this.logger = new Logger({ name: "OpenFigi" })
  }

  /**
   * Make a POST request to openfigi.
   */
  public async post<T>({
    path,
    body,
  }: PostRequest): Promise<{ data: T; error?: string; warning?: string }> {
    if (!body) {
      body = {}
    }

    const url = `${this.baseUrl}${path}`

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const backoff = Math.random() * 2 ** Math.min(attempt, 6)

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OPENFIGI-APIKEY": this.token,
        },
        body: JSON.stringify(body),
      })

      if (res.status === 429) {
        this.logger.warn(`OpenFigi Ratelimit reached, waiting ${backoff.toFixed(0)}s`)
        await new Promise((resolve) => setTimeout(resolve, backoff * 1000))
        continue
      }
      /**
       * We need to handle some 400 errors specifically.
       */

      if (res.status !== 200) {
        throw new HttpError(res.status, path)
      }
      const unmarshalled = await res.json().catch((err) => {
        throw new Error(`Unable to unmarshal response: ${err}`)
      })
      if (unmarshalled.error) {
        throw new Error(`Figi api error: ${unmarshalled.error}`)
      }
      return unmarshalled
    }
    throw new Error(`Unable to fetch from openfigi, ran out of retries: ${path}`)
  }
}

import { env } from "@chronark/env"
import { HTTPError, JsonUnmarshalError } from "@perfolio/util/errors"
import { Logger } from "@perfolio/logger"
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
  parameters?: Record<string, string | string[] | number | number[] | undefined>
}

/**
 * SDK for IEXCloud resources.
 */
export class Client {
  private readonly baseUrl: string
  private readonly token: string
  public readonly logger: Logger

  constructor(config?: ApiConfig) {
    this.baseUrl = config?.baseUrl ?? env.require("IEX_BASE_URL")
    this.token = config?.token ?? env.require("IEX_TOKEN")
    this.logger = new Logger({
      name: "IEX Client",
    })
  }

  /**
   * Make a GET request to iexcloud.
   */
  public async get({ path, parameters }: GetRequest): Promise<unknown> {
    if (!parameters) {
      parameters = {}
    }
    parameters["token"] = this.token

    /**
     * Flatten query.
     */
    const query = Object.entries(parameters)
      .map(([k, v]) => {
        if (Array.isArray(v)) {
          v = v.join(",")
        }
        return `${k}=${v}`
      })
      .join("&")

    const url = `${this.baseUrl}${path}?${query}`

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const backoff = Math.random() * 2 ** Math.min(attempt, 6)

      const res = await fetch(url, {
        method: "GET",
      })
      if (res.status === 429) {
        this.logger.warn(`IEX Ratelimit reached [ ${path} ], waiting ${backoff.toFixed(0)}s`)
        await new Promise((resolve) => setTimeout(resolve, backoff * 1000))
        continue
      }
      /**
       * We need to handle some 400 errors specifically.
       */
      if (res.status === 400) {
        throw new HTTPError(res.status, `Unable to reach resource: ${path}: ${await res.text()}`)
      }

      if (res.status !== 200) {
        throw new HTTPError(res.status, path)
      }
      return res.json().catch((err) => {
        throw new JsonUnmarshalError(err)
      })
    }
    throw new Error(`Unable to fetch from iex, ran out of retries: ${path}`)
  }
}

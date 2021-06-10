/**
 * Generic api request to be extended by other request types.
 */
export interface ApiRequest {
  /**
   * Access token to authenticate the current user.
   */
  token?: string;
}

/**
 * Configuration to create a new api instance.
 */
export interface ApiConfig {
  /**
   * Sets the base url where paths are appended.
   */
  baseUrl?: string;

  /**
   * Set a JWT to be used when requesting resources from the server.
   */
  token?: string;
}

export interface GetRequest extends ApiRequest {
  /**
   * Url path appended to the baseUrl.
   */
  path: string;

  /**
   * Query parameters.
   */
  parameters?: Record<string, string | number | undefined>;
}

export class ErrorHTTP400 extends Error {}

/**
 * SDK for IEXCloud resources.
 */
export class Client {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(config?: ApiConfig) {
    const baseUrl = config?.baseUrl ?? process.env['IEX_BASE_URL'];

    if (!baseUrl) {
      throw new Error('IEX_BASE_URL must be defined');
    }
    this.baseUrl = baseUrl;

    const token = config?.token ?? process.env['IEX_TOKEN'];

    if (!token) {
      throw new Error('IEX_TOKEN must be defined');
    }
    this.token = token;
  }

  /**
   * Make a GET request to iexcloud.
   */
  public async get({ path, parameters }: GetRequest): Promise<unknown> {
    if (!parameters) {
      parameters = {};
    }
    parameters['token'] = this.token;

    /**
     * Flatten query.
     */
    const query = Object.entries(parameters)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const url = `${this.baseUrl}${path}?${query}`;

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const backoff = Math.random() * 2 ** Math.min(attempt, 6);

      const res = await fetch(url, {
        method: 'GET',
      });
      if (res.status === 429) {
        console.warn(`IEX Ratelimit reached, waiting ${backoff.toFixed(0)}s`);
        await new Promise((resolve) => setTimeout(resolve, backoff * 1000));
        continue;
      }
      /**
       * We need to handle some 400 errors specifically.
       */
      if (res.status === 400) {
        throw new ErrorHTTP400(
          `Unable to GET endpoint ${path}, failed with status: ${res.status}`
        );
      }

      if (res.status !== 200) {
        throw new Error(
          `Unable to GET endpoint ${path}, failed with status: ${res.status}`
        );
      }
      return res.json().catch((err) => {
        throw new Error(`Unable to unmarshal response: ${err}`);
      });
    }
    throw new Error(`Unable to fetch from iex, ran out of retries: ${path}`);
  }
}

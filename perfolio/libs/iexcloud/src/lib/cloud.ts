import { GetHistoryRequest, GetHistoryResponse } from './interface';
import { ApiConfig, GetRequest } from './types';
import { Logger } from 'tslog';

export class ErrorHTTP400 extends Error {}

/**
 * SDK for IEXCloud resources.
 */
export class Client {
  private readonly baseUrl: string;
  private readonly logger: Logger;

  /**
   * JWT to be used as default. Will be populated after running `signin`.
   */
  private token?: string;

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
    this.logger = new Logger();
  }

  private async get({ path, parameters }: GetRequest): Promise<unknown> {
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
        this.logger.debug(
          `IEX Ratelimit reached, waiting ${backoff.toFixed(0)}s`
        );
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

  /**
   * Load all prices for a specific symbol.
   */
  public async getHistory(req: GetHistoryRequest): Promise<GetHistoryResponse> {
    // const symbol = (await this.getSymbol(req)).symbol
    // const res = (await this.get({
    //   path: `/stock/${symbol}/chart/max`,
    //   parameters: {
    //     chartCloseOnly: "true",
    //   },
    // })) as { date: string; close: number }[]

    // return res.map((p) => {
    //   const date = p.date.split("-")
    //   const year = Number(date[0])
    //   const month = Number(date[1])
    //   const day = Number(date[2])
    //   return {
    //     time: new Time(year, month, day),
    //     value: res[0]?.close ?? -1,
    //   }
    // })
    return [];
  }
}

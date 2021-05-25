import {
  GetCompanyRequest,
  GetCompanyResponse,
  GetLogoResponse,
  GetLogoRequest,
  GetPriceRequest,
  GetPriceResponse,
  GetHistoryRequest,
  GetHistoryResponse,
  GetSymbolRequest,
  GetSymbolResponse,
  GetCurrentPriceRequest,
  GetCurrentPriceResponse,
  IEXService,
} from "./interface"
import { ApiConfig, GetRequest } from "./types"
import { Time } from "pkg/time"

export class ErrorHTTP400 extends Error {}

/**
 * SDK for IEXCloud resources.
 */
export class Cloud implements IEXService {
  private readonly baseUrl: string

  /**
   * JWT to be used as default. Will be populated after running `login`.
   */
  private token?: string

  constructor(config?: ApiConfig) {
    const baseUrl = config?.baseUrl ?? process.env["IEX_BASE_URL"]

    if (!baseUrl) {
      throw new Error("IEX_BASE_URL must be defined")
    }
    this.baseUrl = baseUrl

    const token = config?.token ?? process.env["IEX_TOKEN"]

    if (!token) {
      throw new Error("IEX_TOKEN must be defined")
    }
    this.token = token
  }

  private async get({ path, parameters }: GetRequest): Promise<unknown> {
    if (!parameters) {
      parameters = {}
    }
    parameters["token"] = this.token

    /**
     * Flatten query.
     */
    const query = Object.entries(parameters)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")

    const url = `${this.baseUrl}${path}?${query}`

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const backoff = Math.random() * 2 ** Math.min(attempt, 6)

      const res = await fetch(url, {
        method: "GET",
      })
      if (res.status === 429) {
        console.debug(`IEX Ratelimit reached, waiting ${backoff.toFixed(0)}s`)
        await new Promise((resolve) => setTimeout(resolve, backoff * 1000))
        continue
      }
      /**
       * We need to handle some 400 errors specifically.
       */
      if (res.status === 400) {
        throw new ErrorHTTP400(`Unable to GET endpoint ${path}, failed with status: ${res.status}`)
      }

      if (res.status !== 200) {
        throw new Error(`Unable to GET endpoint ${path}, failed with status: ${res.status}`)
      }
      return res.json().catch((err) => {
        throw new Error(`Unable to unmarshal response: ${err}`)
      })
    }
    throw new Error(`Unable to fetch from iex, ran out of retries: ${path}`)
  }

  /**
   * Load data for a specific company by its symbol.
   */
  public async getCompany(req: GetCompanyRequest): Promise<GetCompanyResponse> {
    let symbol: string
    if ("symbol" in req) {
      symbol = req.symbol.toLowerCase()
    } else {
      symbol = (await this.getSymbol({ isin: req.isin })).symbol
    }

    const res = (await this.get({
      path: `/stock/${symbol}/company`,
    })) as any

    return {
      ...res,
      name: res.companyName,
    }
  }

  /**
   * Load logo for a specific company by its symbol.
   */
  public async getLogo(req: GetLogoRequest): Promise<GetLogoResponse> {
    const symbol = req.symbol.toLowerCase()

    const res = (await this.get({
      path: `/stock/${symbol}/logo`,
    })) as { url: string }
    const url = res.url
      ? res.url
      : "https://avatars.githubusercontent.com/u/67603535?s=400&u=cb14061ee696c1d3ca79760fcc80dd00ad93d8d3&v=4"
    return { url }
  }

  /**
   * Load the closing price for a specific date.
   */
  public async getPrice(req: GetPriceRequest): Promise<GetPriceResponse> {
    const { year, month, day } = req.time.pad()
    const symbol = req.symbol.toLowerCase()
    const res = await this.get({
      path: `/stock/${symbol}/chart/date/${year}${month}${day}`,
      parameters: {
        chartByDay: "true",
        chartCloseOnly: "true",
      },
    }).catch((err) => {
      /**
       * Just return -1 if the request was in the past where no price data was availabe.
       */
      if (err instanceof ErrorHTTP400 && req.time.unix() <= Time.today().unix()) {
        return {
          symbol: req.symbol,
          time: req.time.unix(),
          value: -1,
        }
      } else {
        throw err
      }
    })
    const price = res as { close: number }[]

    return {
      value: price?.[0]?.close ?? -1,
    }
  }

  /**
   * Load all prices for a specific symbol.
   */
  public async getHistory(req: GetHistoryRequest): Promise<GetHistoryResponse> {
    const symbol = req.symbol.toLowerCase()
    const res = (await this.get({
      path: `/stock/${symbol}/chart/max`,
      parameters: {
        chartCloseOnly: "true",
      },
    })) as { date: string; close: number }[]

    return res.map((p) => {
      const date = p.date.split("-")
      const year = Number(date[0])
      const month = Number(date[1])
      const day = Number(date[2])
      return {
        time: new Time(year, month, day),
        value: res[0]?.close ?? -1,
      }
    })
  }

  /**.
   * Https://iexcloud.io/docs/api/#isin-mapping
   *
   * @param isin - https://www.investopedia.com/terms/i/isin.asp
   */
  public async getSymbol(req: GetSymbolRequest): Promise<GetSymbolResponse> {
    const res = await this.get({
      path: "/ref-data/isin",
      parameters: {
        isin: req.isin,
      },
    })
    const isinMap = res as { region: string; symbol: string }[]
    for (const map of isinMap) {
      if (req.isin.startsWith(map.region)) {
        const company = await this.getCompany({ symbol: map.symbol }).catch((err) => {
          throw new Error(`Unable to fetch company: [ ${err} ]`)
        })
        if (company.companyName !== "") {
          // iex also ships a`.iexId` field that is always null and causes issues when
          // saving to the database, so we clean it up a little and inject the isin as well.
          return {
            symbol: map.symbol,
          }
        }
      }
    }
    throw new Error(`No correct isin found for: ${req.isin}. IEX returned: ${res}.`)
  }
  public async getCurrentPrice(req: GetCurrentPriceRequest): Promise<GetCurrentPriceResponse> {
    const symbol = (await this.getSymbol(req)).symbol

    const res = await this.get({
      path: `/stock/${symbol}/price`,
    })
    if (typeof res !== "number") {
      throw new Error("IEX did not return a value")
    }
    return { value: res }
  }
}

import { Company, Price, Isin } from "@prisma/client"
import { ErrIEXReturnedNoData, ErrTokenNotFound } from "../errors"
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { Time } from "pkg/time"

export class Cloud {
  private readonly token: string
  private readonly baseURL: string

  /**
   * Create a new iexCloud API.
   */
  constructor(config?: { token?: string; baseURL?: string }) {
    this.token = config?.token ?? process.env.IEX_TOKEN
    if (!this.token || this.token === "") {
      throw new ErrTokenNotFound()
    }
    this.baseURL = config?.baseURL ?? "https://cloud.iexapis.com/stable"
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async fetch(url: string): Promise<any> {
    let res: AxiosResponse
    try {
      res = await this.createRequester().get(url)
    } catch (err) {
      throw new Error(`Axios encountered: ${err}`)
    }

    if (res.status !== 200) {
      throw new Error(
        `Expected status 200, but was ${res.status}: ${res.statusText}`,
      )
    }
    if (!res.data || res.data === [] || res.data === {}) {
      throw new ErrIEXReturnedNoData(url)
    }
    return res.data
  }
  /**
   * Create a new axios instance that automatically retries when hitting 429 errors.
   *
   * From iexcloud:
   * "Too many requests hit the API too quickly. An exponential backoff of your requests is recommended."".
   */
  private createRequester(): AxiosInstance {
    let retries = 5
    let sleep = 100 // milliseconds
    const maxSleep = 1000 // milliseconds
    const instance = axios.create()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const backoff = (req: any) => {
      return new Promise((resolve, reject) => {
        if (retries > 0) {
          sleep *= 2
          if (sleep > maxSleep) {
            sleep = maxSleep
          }
          retries--
          setTimeout(() => resolve(instance(req)), sleep)
        } else {
          reject(`Already retried 5 times`)
        }
      })
    }
    instance.interceptors.response.use(
      (res) => {
        return res
      },
      (error) => {
        const {
          config,
          response: { status },
        } = error
        const req = config
        if (status === 429) {
          return backoff(req)
        }
        return Promise.reject(error)
      },
    )
    return instance
  }
  /**.
   * Https://iexcloud.io/docs/api/#company
   *
   * @param symbol - iex internal symbol, may be the same as the ticker but does not have to be.
   */
  public async getCompany(symbol: string): Promise<Company> {
    symbol = symbol.toLowerCase()
    const companyURL = `${this.baseURL}/stock/${symbol}/company?token=${this.token}`

    const res = await this.fetch(companyURL).catch((err) => {
      throw new Error(`Unable to load company from iex cloud: ${err}`)
    })
    const logo = await this.getLogo(symbol).catch((err) => {
      throw new Error(`Unable to fetch logo url for ${symbol}: ${err}`)
    })

    return {
      id: res.id,
      symbol,
      logo,
      name: res.companyName,
      exchange: res.exchange,
      industry: res.industry,
      website: res.website,
      description: res.description,
      ceo: res.CEO,
      issueType: res.issueType,
      sector: res.sector,
      employees: res.employees,
      // tags: res.tags,
      securityName: res.securityName,
      primarySICCode: res.primarySICCode,
      address: res.address,
      address2: res.address2,
      state: res.state,
      city: res.city,
      zip: res.city,
      country: res.country,
      phone: res.phone,
    } as Company
  }

  public async getLogo(symbol: string): Promise<string> {
    const logoURL = `${this.baseURL}/stock/${symbol.toLowerCase()}/logo?token=${
      this.token
    }`

    const res = await this.fetch(logoURL)
    let logo = res.url as string
    if (!logo || logo === "") {
      console.warn(`No logo found for ${symbol}`)
      logo =
        "https://avatars.githubusercontent.com/u/67603535?s=400&u=cb14061ee696c1d3ca79760fcc80dd00ad93d8d3&v=4"
    }

    return logo
  }

  /**.
   * Https://iexcloud.io/docs/api/#historical-prices
   *
   * @param symbol - iex internal symbol, may be the same as the ticker but does not have to be.
   * @param time - The day, must have hour=0, minute=0, second=0 and ms=0
   */
  public async getClosingPrice(symbol: string, time: Time): Promise<Price> {
    const { year, month, day } = time.pad()

    const url = `${this.baseURL}/stock/${symbol}/chart/date/${year}${month}${day}?token=${this.token}&chartByDay=true&chartCloseOnly=true`
    const res = await this.fetch(url).catch((err) => {
      throw new Error(`Unable to load closing price from iex cloud: ${err}`)
    })
    const iexPrices = res as { close: number }[]
    if (iexPrices.length === 0) {
      return { time: time.toDate(), symbol, value: -1 } as Price
    }
    return {
      time: time.toDate(),
      symbol,
      value: iexPrices[0].close,
    } as Price
  }

  public async getHistory(symbol: string): Promise<Price[]> {
    const url = `${this.baseURL}/stock/${symbol}/chart/max?token=${this.token}`
    const res = await this.fetch(url).catch((err) => {
      throw new Error(`Unable to load closing price from iex cloud: ${err}`)
    })
    const iexPrices = res as { close: number; date: string }[]
    if (iexPrices.length === 0) {
      throw new Error(`IEX did not find prices for ${symbol}`)
    }
    return iexPrices.map((price) => {
      return {
        time: new Date(price.date),
        symbol,
        value: price.close,
      } as Price
    })
  }
  /**.
   * Https://iexcloud.io/docs/api/#isin-mapping
   *
   * @param isin - https://www.investopedia.com/terms/i/isin.asp
   */
  public async getIsin(isin: string): Promise<Isin> {
    const url = `${this.baseURL}/ref-data/isin?isin=${isin}&token=${this.token}`
    const res = await this.fetch(url)
    const isinMap = res as Isin[]
    for (const map of isinMap) {
      if (isin.startsWith(map.region)) {
        const company = await this.getCompany(map.symbol).catch((err) => {
          return new Error(`Unable to fetch company: [ ${err} ]`)
        })
        if (company.name !== "") {
          // iex also ships a`.iexId` field that is always null and causes issues when
          // saving to the database, so we clean it up a little and inject the isin as well.
          return {
            isin: isin,
            symbol: map.symbol,
            exchange: map.exchange,
            region: map.region,
          } as Isin
        }
      }
    }
    throw new Error(`No correct isin found for: ${isin}. IEX returned: ${res}.`)
  }

  public async getCurrentValue(symbol: string): Promise<number> {
    const companyURL = `${this.baseURL}/stock/${symbol}/price?token=${this.token}`
    const res = await this.fetch(companyURL).catch((err) => {
      throw new Error(`Unable to load latest price from iex: [ ${err} ]`)
    })
    if (typeof res !== "number") {
      throw new Error("IEX did not return a value")
    }
    return res as number
  }
}

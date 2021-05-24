import {
  GetCompanyCloudRequest,
  GetCompanyCloudResponse,
  GetLogoCloudResponse,
  GetLogoCloudRequest,
  GetPriceCloudRequest,
  GetPriceCloudResponse,
} from "./interface"
import { Prisma } from "@prisma/client"
import { ApiConfig, GetRequest } from "./types"

/**
 * SDK for IEXCloud resources.
 */
export class Cloud {
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

      if (res.status !== 200) {
        throw new Error(
          `Unable to GET endpoint ${path}, failed with status: ${res.status}`,
        )
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
  public async getCompany(
    req: GetCompanyCloudRequest,
  ): Promise<Prisma.CompanyCreateInput> {
    const symbol = req.symbol.toLowerCase()

    const res = (await this.get({
      path: `/stock/${symbol}/company`,
    })) as GetCompanyCloudResponse

    const logo = await this.getLogo({ symbol })

    return {
      symbol: res.symbol,
      logo: logo.url,
      name: res.companyName,
      exchange: res.exchange,
      industry: res.industry,
      website: res.website,
      description: res.description,
      ceo: res.CEO,
      issueType: res.issueType,
      sector: res.sector,
      employees: res.employees,
      securityName: res.securityName,
      primarySICCode: res.primarySicCode,
      address: res.address,
      address2: res.address2,
      state: res.state,
      city: res.city,
      zip: res.zip,
      country: res.country,
      phone: res.phone,
    }
  }

  /**
   * Load logo for a specific company by its symbol.
   */
  public async getLogo(
    req: GetLogoCloudRequest,
  ): Promise<GetLogoCloudResponse> {
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
  public async getPrice(
    req: GetPriceCloudRequest,
  ): Promise<Prisma.PriceCreateInput> {
    const { year, month, day } = req.time.pad()
    const symbol = req.symbol.toLowerCase()
    const res = (await this.get({
      path: `/stock/${symbol}/chart/date/${year}${month}${day}`,
      parameters: {
        chartByDay: "true",
        chartCloseOnly: "true",
      },
    })) as GetPriceCloudResponse[]

    return {
      symbol: req.symbol,
      time: req.time.unix(),
      value: res[0]?.close ?? -1,
    }
  }
}

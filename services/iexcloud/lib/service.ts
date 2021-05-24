import {
  IEXService,
  GetCompanyRequest,
  GetCompanyResponse,
  GetPricesRequest,
  GetPricesResponse,
  GetPriceRequest,
} from "./interface"
import { Price } from "@prisma/client"
import { Cache } from "./cache/cache"
import { Cloud } from "./cloud/cloud"
import { Repository } from "./cache/interface"
import { Time } from "pkg/time"

export class IEXCloud implements IEXService {
  private cache: Repository
  private cloud: Cloud

  constructor() {
    this.cache = new Cache()
    this.cloud = new Cloud()
  }
  public async close(): Promise<void> {
    this.cache.close()
  }

  public async getCompany(req: GetCompanyRequest): Promise<GetCompanyResponse> {
    const symbol = req.symbol.toLowerCase()
    let company = await this.cache.getCompany(symbol).catch((err) => {
      throw new Error(`Unable to load company from cache: [ ${err} ]`)
    })
    if (company === null) {
      const newCompany = await this.cloud
        .getCompany({ symbol })
        .catch((err) => {
          throw new Error(`Unable to load company from cloud: [ ${err} ]`)
        })
      if (newCompany) {
        company = await this.cache.setCompany(newCompany).catch((err) => {
          throw new Error(`Unable to store company in cache: [ ${err} ]`)
        })
      }
    }
    if (!company) {
      throw new Error(`Unable to find a company for: ${req.symbol}`)
    }
    return { company }
  }
  public async getPrices(req: GetPricesRequest): Promise<GetPricesResponse> {
    /*
     *  Cache
     */
    const symbol = req.symbol.toLowerCase()

    const priceRequests: Time[] = []
    for (
      let day = req.begin;
      day.unix() <= req.end.unix();
      day = day.nextDay()
    ) {
      priceRequests.push(day)
    }

    const prices = await Promise.all(
      priceRequests.map((time) => {
        return this.getPrice({ symbol, time })
      }),
    )
    /**
     * Has the format:
     * [unixTImestamp]: value.
     */
    const priceMap: Record<number, number> = {}
    prices
      .filter((p) => p.value > 0)
      .forEach((price) => {
        priceMap[price.time] = price.value
      })
    return { prices: priceMap }
  }

  /**
   * Load price for a single symbol on a single day.
   */
  private async getPrice(req: GetPriceRequest): Promise<Price> {
    const symbol = req.symbol.toLowerCase()
    const price = await this.cache.getPrice(symbol, req.time).catch((err) => {
      throw new Error(`Unable to load price from cache: [ ${err} ]`)
    })
    if (price) {
      return price
    }
    const newPrice = await this.cloud.getPrice(req).catch((err) => {
      throw new Error(`Unable to load closing price from cloud: ${err}`)
    })
    console.log({ newPrice })
    return this.cache.setPrice(newPrice).catch((err) => {
      throw new Error(`Unable to store prices in cache: ${err}`)
    })
  }
}

import {
  IEXService,
  GetCompanyRequest,
  GetCompanyResponse,
  GetPricesRequest,
  GetPricesResponse,
  GetPriceRequest,
  GetSymbolRequest,
  GetSymbolResponse,
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
      const newCompany = await this.cloud.getCompany({ symbol }).catch((err) => {
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
    const symbol = req.symbol.toLowerCase()

    let cachedPrices = await this.cache.getPrices(symbol, req.begin, req.end)

    /**
     * In case this is a new company we load everything in bulk and return immediately
     * because we are certain there are no dates missing.
     */
    if (cachedPrices.length === 0) {
      console.debug(`No prices for ${symbol} found. Bulk importing from iex...`)
      const allPrices = await this.cloud.getHistory({ symbol })
      console.debug(`Processing ${allPrices.length} new prices for ${symbol}`)
      cachedPrices = await this.cache.setPrices(allPrices)
      console.debug("Done")

      // const prices: Record<number, number> = {}
      // cachedPrices
      //   .filter((p) => {
      //     p.value > 0
      //   })
      //   .forEach((p) => {
      //     prices[p.time] = p.value
      //   })
      // return { prices }
    }

    /**
     * If we have a subset of dates but potentially missing a few we fetch the missing
     * ones in parallel.
     */

    /**
     * Has the format:
     * [unixTImestamp]: value.
     */
    const priceMap: Record<number, number> = {}
    cachedPrices.forEach((price) => {
      priceMap[price.time] = price.value
    })

    const priceRequests: Time[] = []
    for (let day = req.begin; day.unix() <= req.end.unix(); day = day.nextDay()) {
      if (!priceMap[day.unix()]) {
        priceRequests.push(day)
      }
    }

    const newPrices = await Promise.all(
      priceRequests.map((time) => {
        return this.getPrice({ symbol, time })
      }),
    )

    newPrices.forEach((price) => {
      priceMap[price.time] = price.value
    })

    const filteredPriceMap = {}
    Object.entries(priceMap).forEach(([ts, value]) => {
      if (value > 0 && Number(ts) >= req.begin.unix() && Number(ts) <= req.end.unix()) {
        filteredPriceMap[ts] = value
      }
    })

    return { prices: filteredPriceMap }
  }

  /**
   * Load price for a single symbol on a single day.
   */
  public async getPrice(req: GetPriceRequest): Promise<Price> {
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
    return this.cache.setPrice(newPrice).catch((err) => {
      throw new Error(`Unable to store prices in cache: ${err}`)
    })
  }

  /**
   * Request the symbol associated with a given ISIN.
   *
   * @param req
   * @returns The found symbol or null.
   * @throws Only throws when something goes wrong.
   */
  public async getSymbol(req: GetSymbolRequest): Promise<GetSymbolResponse> {
    const map = await this.cloud.getIsin(req.isin).catch((err) => {
      throw new Error(`Unable to fetch isin from cloud: [ ${err} ]`)
    })

    return { symbol: map.symbol }
  }
}

import {
  IEXService,
  GetCompanyRequest,
  GetCompanyResponse,
  GetPriceRequest,
  GetPricesRequest,
  GetPriceResponse,
  GetPricesResponse,
  GetSymbolRequest,
  GetSymbolResponse,
  GetCurrentValueRequest,
  GetCurrentValueResponse,
} from "./interface"
import { Cache } from "./cache/cache"
import { Cloud } from "./cloud/cloud"
import { Repository } from "./cache/interface"
import { Price } from "@prisma/client"

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
    const { symbol } = req
    let company = await this.cache.getCompany(symbol).catch((err) => {
      throw new Error(`Unable to load company from cache: [ ${err} ]`)
    })
    if (company === null) {
      company = await this.cloud.getCompany(symbol).catch((err) => {
        throw new Error(`Unable to load company from cloud: [ ${err} ]`)
      })
      await this.cache.setCompany(company).catch((err) => {
        throw new Error(`Unable to store company in cache: [ ${err} ]`)
      })
    }
    return { company }
  }
  public async getPrices(req: GetPricesRequest): Promise<GetPricesResponse> {
    /*
     *  Cache
     */
    const symbol = req.symbol.toLowerCase()
    const foundPrices = await this.cache
      .getPrices(symbol, req.begin, req.end)
      .catch((err) => {
        throw new Error(`Unable to load prices from cache: [ ${err} ]`)
      })

    // UNIX timestamp as key
    const prices: Map<number, number> = new Map()
    const ctx = `getPrices(${symbol})`
    console.time(ctx)
    for (
      let time = req.begin;
      time.unix() < req.end.unix();
      time = time.nextDay()
    ) {
      console.timeLog(ctx, time.toString())
      let price = foundPrices.find((p) => p.time.getTime() === time.unix())

      if (!price) {
        const { value } = await this.getPrice({ symbol, time })

        price = { time: time.toDate(), value } as Price
      }
      prices.set(price.time.getTime(), price.value)
    }
    console.timeEnd(ctx)
    return { prices }
  }
  public async getPrice(req: GetPriceRequest): Promise<GetPriceResponse> {
    const symbol = req.symbol.toLowerCase()

    let price = await this.cache.getPrice(symbol, req.time).catch((err) => {
      throw new Error(`Unable to load price from cache: [ ${err} ]`)
    })

    // Check if no prices for this company are stored yet
    const pricesExist = await this.cache
      .findPricesForCompany(symbol)
      .catch((err) => {
        throw new Error(`Unable to load prices from cache: [ ${err} ]`)
      })
    if (!pricesExist) {
      const prices = await this.cloud.getHistory(symbol).catch((err) => {
        throw new Error(`Unable to load history from cloud: [ ${err} ]`)
      })

      await this.cache.setPrices(prices).catch((err) => {
        throw new Error(`Unable to store prices in cache: [ ${err} ]`)
      })
    }

    price = await this.cloud.getClosingPrice(symbol, req.time).catch((err) => {
      throw new Error(`Unable to load closing price from cloud: [ ${err} ]`)
    })
    await this.cache.setPrices([price]).catch((err) => {
      throw new Error(`Unable to store prices in cache: [ ${err} ]`)
    })

    return { value: price.value }
  }

  /**
   * Request the symbol associated with a given ISIN.
   *
   * @param req
   * @returns The found symbol or null.
   * @throws Only throws when something goes wrong.
   */
  public async getSymbol(req: GetSymbolRequest): Promise<GetSymbolResponse> {
    const symbol = await this.cache.getSymbol(req.isin).catch((err) => {
      throw new Error(`Unable to load symbol from cache: [ ${err} ]`)
    })
    if (symbol !== null) {
      return { symbol }
    }

    const map = await this.cloud.getIsin(req.isin).catch((err) => {
      throw new Error(`Unable to fetch isin from cloud: [ ${err} ]`)
    })
    await this.cache.setIsinMap(map).catch((err) => {
      throw new Error(`Unable to store isinMap in cache: [ ${err} ]`)
    })
    return { symbol: map.symbol }
  }
  public async getCurrentValue(
    req: GetCurrentValueRequest,
  ): Promise<GetCurrentValueResponse> {
    const value = await this.cloud.getCurrentValue(req.symbol).catch((err) => {
      throw new Error(`Unable to fetch current value: [ ${err} ]`)
    })

    return { value }
  }
}

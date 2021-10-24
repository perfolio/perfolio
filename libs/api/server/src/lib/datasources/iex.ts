import * as cloud from "@perfolio/integrations/iexcloud"

import { ApolloCache, Key } from "@perfolio/integrations/redis"
import { CompanyStock, Exchange } from "@perfolio/api/graphql"
import {
  GetIsinMappingResponse,
  GetSymbolsAtExchangeResponse,
  SearchResponse,
} from "@perfolio/integrations/iexcloud"

import { DataSource } from "apollo-datasource"
import { HttpError } from "@perfolio/util/errors"
import { Time } from "@perfolio/util/time"

export class IEX extends DataSource {
  constructor() {
    super()
  }

  public async getLogo(ticker: string): Promise<string> {
    const key = new Key({ dataSource: "IEX", operation: "getLogo", ticker })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<string>(key)
    if (cachedValue) {
      return cachedValue
    }

    const res = await cloud.getLogo(ticker)
    const value = res.url
    await cache.set("30d", { key, value })
    return value
  }

  public async getCompanyFromIsin(isin: string) {
    const isinMapping = await this.getIsinMapping(isin)
    const ticker = isinMapping.find((i) => !i.symbol.includes("-"))?.symbol

    if (!ticker) {
      throw new Error(
        `No symbol found for ${isin}, available symbols are : ${JSON.stringify(
          isinMapping.map(({ symbol }) => symbol),
        )}`,
      )
    }
    return await this.getCompany(ticker)
  }

  public async getCompany(ticker: string): Promise<Omit<CompanyStock, "id" | "isin"> | null> {
    const key = new Key({ dataSource: "IEX", operation: "getCompany", ticker })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<Omit<CompanyStock, "id" | "isin">>(key)
    if (cachedValue) {
      return cachedValue
    }
    const company = await cloud.getCompany(ticker).catch((err) => {
      if (err instanceof HttpError) {
        /**
         * 404 simply means the given ticker is invalid which can happen a lot when the user
         * can search for tickers.
         */
        if (err.status === 404) {
          return undefined
        }
      }
      throw err
    })
    if (!company || !company.companyName || !company.sector || !company.country) {
      await cache.set("24h", { key, value: null })
      return null
    }
    const logo = await cloud.getLogo(ticker)
    /**
     * Transform company from iex schema to one we want to use.
     */
    const value = {
      name: company.companyName as string,
      ticker,
      logo: logo.url,
      sector: company.sector as string,
      country: company.country as string,
    }
    await cache.set("30d", { key, value })
    return value
  }
  async getExchanges(): Promise<Exchange[]> {
    const key = new Key({ dataSource: "IEX", operation: "getExchanges" })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<Exchange[]>(key)
    if (cachedValue) {
      return cachedValue
    }
    const exchanges = await cloud.getExchanges()
    const value = exchanges.map((e) => {
      return {
        abbreviation: e.exchange,
        name: e.description,
        suffix: e.exchangeSuffix,
        region: e.region,
        mic: e.mic,
      }
    })
    await cache.set("24h", { key, value })
    return value
  }

  async getExchange({ mic }: { mic: string }): Promise<Exchange | null> {
    const key = new Key({ dataSource: "IEX", operation: "getExchange", mic })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<Exchange>(key)
    if (cachedValue) {
      return cachedValue
    }
    const exchanges = await this.getExchanges()
    const value =
      exchanges.find((exchange) => exchange.mic.toLowerCase() === mic.toLowerCase()) ?? null
    await cache.set("24h", { key, value })
    return value
  }

  async search({ fragment }: { fragment: string }): Promise<SearchResponse> {
    return await cloud.search(fragment)
  }

  async getPrices({ ticker }: { ticker: string }): Promise<{ [time: number]: number }> {
    const key = new Key({ dataSource: "IEX", operation: "getPrices", ticker })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<{ [time: number]: number }>(key)
    if (cachedValue) {
      return cachedValue
    }
    const allPrices = await cloud.getHistory(ticker)
    const value: { [time: number]: number } = {}
    allPrices.forEach(({ date, close }) => {
      const time = Time.fromString(date).unix()
      value[time] = close
    })
    await cache.set("1h", { key, value })
    return value
  }
  async getCurrentPrice({ ticker }: { ticker: string }): Promise<number> {
    const key = new Key({ dataSource: "IEX", operation: "getCurrentPrice", ticker })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<number>(key)
    if (cachedValue) {
      return cachedValue
    }
    const value = await cloud.getCurrentPrice(ticker)
    await cache.set("30m", { key, value })
    return value
  }
  async getSymbolsAtExchange({
    exchange,
  }: {
    exchange: string
  }): Promise<GetSymbolsAtExchangeResponse> {
    const key = new Key({ dataSource: "IEX", operation: "getSymbolsAtExchange", exchange })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<GetSymbolsAtExchangeResponse>(key)
    if (cachedValue) {
      return cachedValue
    }
    const value = await cloud.getSymbolsAtExchange(exchange)
    await cache.set("30d", { key, value })
    return value
  }

  async getIsinMapping(isin: string): Promise<GetIsinMappingResponse> {
    const key = new Key({ dataSource: "IEX", operation: "getIsinMapping", isin })
    const cache = new ApolloCache()
    const cachedValue = await cache.get<GetIsinMappingResponse>(key)
    if (cachedValue) {
      return cachedValue
    }
    const value = await cloud.getIsinMapping(isin)
    await cache.set(value.length > 0 ? "30d" : "1h", { key, value })
    return value
  }
}

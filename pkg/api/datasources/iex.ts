import { Company } from "@perfolio/pkg/api"
import { GetExchangesResponse } from "@perfolio/pkg/integrations/iexcloud"
import { FindTickerResponse } from "@perfolio/pkg/integrations/iexcloud/findTicker"

import { IEXService } from "@perfolio/pkg/integrations/iexcloud/service"
import { GenericCache, Key } from "@perfolio/pkg/integrations/redis"
import { Exchange } from "@perfolio/pkg/types"
import { Time } from "@perfolio/pkg/util/time"
import { DataSource } from "apollo-datasource"

export class IEX extends DataSource {
  private service: IEXService
  private cache: GenericCache
  constructor() {
    super()
    this.service = new IEXService()
    this.cache = new GenericCache()
  }

  public async getCompany(
    ticker: string,
  ): Promise<Omit<Company, "id" | "isin" | "assetHistory" | "type"> | null> {
    const key = new Key(ticker)
    const cached = await this.cache.get<Omit<Company, "id" | "isin" | "assetHistory" | "type">>(key)
    if (cached) {
      return cached
    }

    const company = await this.service.getCompany({ ticker })
    if (!company) {
      return null
    }

    const logo = await this.service.getLogo({ ticker })

    /**
     * Transform company from iex schema to one we want to use.
     */
    const value = {
      name: company.companyName as string,
      ticker,
      logo: logo.url,
      figi: "",
      sector: company.sector ?? "",
      country: company.country ?? "",
      description: company.description,
    }
    await this.cache.set("1h", { key, value })
    return value
  }

  public async getHistory(ticker: string): Promise<{ [time: number]: number }> {
    const key = new Key("getHistory", ticker)
    const cached = await this.cache.get<{ [time: number]: number }>(key)
    if (cached) {
      return cached
    }
    const allPrices = await this.service.getHistory({ ticker })
    const value: { [time: number]: number } = {}
    allPrices.forEach(({ date, close }) => {
      const time = Time.fromString(date).unix()
      value[time] = close
    })
    await this.cache.set("1h", { key, value })
    return value
  }

  public async getExchanges(): Promise<Exchange[]> {
    const key = new Key("exchanges")
    const cached = await this.cache.get<GetExchangesResponse>(key)
    if (cached) {
      return cached
    }

    const value = await this.service.getExchanges()
    await this.cache.set("1h", { key, value })
    return value
  }
  public async findTicker(isin: string) {
    const key = new Key("findTicker", isin)

    const cached = await this.cache.get<FindTickerResponse>(key)
    if (cached) {
      return cached
    }
    const value = await this.service.findTicker({ isin })
    await this.cache.set("1h", { key, value })
    return value
  }
}

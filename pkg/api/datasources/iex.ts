import { Company } from "@perfolio/pkg/api"
import { ApolloCache, Key } from "@perfolio/pkg/integrations/redis"

import { IEXService } from "@perfolio/pkg/integrations/iexcloud/service"
import { HttpError } from "@perfolio/pkg/util/errors"
import { Time } from "@perfolio/pkg/util/time"
import { DataSource } from "apollo-datasource"

export class IEX extends DataSource {
  private cache: ApolloCache
  private service: IEXService
  constructor() {
    super()
    this.cache = new ApolloCache()
    this.service = new IEXService()
  }

  public async getCompany(
    ticker: string,
  ): Promise<Omit<Company, "id" | "isin" | "assetHistory" | "type"> | null> {
    const key = new Key({ dataSource: "IEX", operation: "getCompany", ticker })
    const cachedValue = await this.cache.get<Omit<Company, "id" | "isin">>(key)
    if (cachedValue) {
      return cachedValue
    }
    const company = await this.service.getCompany({ ticker })
    if (!company) {
      await this.cache.set("24h", { key, value: null })
      return null
    }

    const logo = await this.service.getLogo({ticker})

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
    await this.cache.set("30d", { key, value })
    return value
  }
}

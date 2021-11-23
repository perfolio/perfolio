import { Company } from "@perfolio/pkg/api"

import { IEXService } from "@perfolio/pkg/integrations/iexcloud/service"
import { Time } from "@perfolio/pkg/util/time"
import { DataSource } from "apollo-datasource"

export class IEX extends DataSource {
  private service: IEXService
  constructor() {
    super()
    this.service = new IEXService()
  }

  public async getCompany(
    ticker: string,
  ): Promise<Omit<Company, "id" | "isin" | "assetHistory" | "type"> | null> {
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
    return value
  }

  public async getHistory(ticker: string): Promise<{ [time: number]: number }> {
    const allPrices = await this.service.getHistory({ ticker })
    const value: { [time: number]: number } = {}
    allPrices.forEach(({ date, close }) => {
      const time = Time.fromString(date).unix()
      value[time] = close
    })
    return value
  }

  public async getExchanges() {
    return await this.service.getExchanges()
  }
  public async findTicker(isin: string) {
    return await this.service.findTicker({ isin })
  }
}

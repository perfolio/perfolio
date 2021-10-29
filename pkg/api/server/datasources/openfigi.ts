import { DataSource } from "apollo-datasource"
import { search, getTickerFromIsin } from "@perfolio/pkg/integrations/openfigi"

export class OpenFigi extends DataSource {
  constructor() {
    super()
  }

  async searchCompanies(
    fragment: string,
    { currency, mic }: { currency?: string; mic?: string },
  ): Promise<string[]> {
    const figis = await search({ fragment, currency, exchange: mic })
    return figis
  }

  async getTickerFromIsin(isin: string): Promise<string | null> {
    return await getTickerFromIsin({ isin })
  }
}

import { DataSource } from "apollo-datasource"
import { search } from "@perfolio/integrations/openfigi"

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
}

import { DataSource } from "apollo-datasource"
import { Exchange, IssueType, Company } from "@perfolio/api/graphql"
import {
  search as getSearchFromCloud,
  getCompany as getCompanyFromCloud,
  getLogo as getLogoFromCloud,
  getExchanges as getExchangesFromCloud,
  getFigiMapping,
  getHistory,
} from "@perfolio/integrations/iexcloud"
import { Time } from "@perfolio/util/time"
import { HTTPError } from "@perfolio/util/errors"

export class IEX extends DataSource {
  constructor() {
    super()
  }

  public async getLogo(ticker: string): Promise<string> {
    const res = await getLogoFromCloud(ticker)
    return res.url ?? ""
  }

  public async getCompaniesFromFigis(figis: string[]): Promise<Company[]> {
    const symbols = await getFigiMapping(...figis)
    const companies = await Promise.all(symbols.map(({ symbol }) => this.getCompany(symbol)))
    return companies.filter((c) => c !== null) as Company[]
  }

  public async getCompany(ticker: string) {
    const company = await getCompanyFromCloud(ticker).catch((err) => {
      if (err instanceof HTTPError) {
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
    /**
     * Transform company from iex schema to one we want to use.
     */
    return company
      ? {
          name: (company.companyName as string) ?? undefined,
          /**
           * Copy the rest
           */
          ticker: ticker,
          industry: (company.industry as string) ?? undefined,
          website: (company.website as string) ?? undefined,
          description: (company.description as string) ?? undefined,
          ceo: (company.CEO as string) ?? undefined,
          issueType: (company as unknown as IssueType) ?? undefined,
          sector: (company.sector as string) ?? undefined,
          employees: (company.employees as number) ?? undefined,
          securityName: (company.securityName as string) ?? undefined,
          primarySicCode: (company.primarySicCode as number) ?? undefined,
          address: (company.address as string) ?? undefined,
          address2: (company.address2 as string) ?? undefined,
          tags: (company.tags as string[]) ?? undefined,
          state: (company.state as string) ?? undefined,
          city: (company.city as string) ?? undefined,
          zip: (company.zip as string) ?? undefined,
          country: (company.country as string) ?? undefined,
          phone: (company.phone as string) ?? undefined,
        }
      : null
  }
  async getExchanges(): Promise<Exchange[]> {
    const exchanges = await getExchangesFromCloud()
    return exchanges.map((e) => {
      return {
        abbreviation: e.exchange,
        name: e.description,
        suffix: e.exchangeSuffix,
        region: e.region,
        mic: e.mic,
      }
    })
  }

  async getExchange({ mic }: { mic: string }): Promise<Exchange | null> {
    const exchanges = await this.getExchanges()
    const exchange = exchanges.find((exchange) => exchange.mic.toLowerCase() === mic.toLowerCase())
    return exchange ?? null
  }

  async search({ fragment }: { fragment: string }): Promise<Company[]> {
    const result = await getSearchFromCloud(fragment)

    const companies = await Promise.all(result.map(({ symbol }) => this.getCompany(symbol)))
    /**
     * Filter out symbols with exchange-suffix. We only want the "real" company here.
     */
    return companies.filter((c) => c !== null && !c.ticker.includes("-")) as Company[]
  }

  async getPrices({ ticker }: { ticker: string }): Promise<{ [time: number]: number }> {
    const allPrices = await getHistory(ticker)
    const formatted: { [time: number]: number } = {}
    allPrices.forEach(({ date, close }) => {
      const time = Time.fromString(date).unix()
      formatted[time] = close
    })
    return formatted
  }
}

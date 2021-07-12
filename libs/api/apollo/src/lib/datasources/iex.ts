import { DataSource } from "apollo-datasource"
import { IssueType } from "@perfolio/api/graphql"
import {
  getCompany as getCompanyFromCloud,
  getLogo as getLogoFromCloud,
} from "@perfolio/integrations/iexcloud"
import { HTTPError } from "@perfolio/util/errors"

export class IEX extends DataSource {
  constructor() {
    super()
  }

  public async getLogo(ticker: string): Promise<string> {
    const res = await getLogoFromCloud(ticker)
    return res.url ?? ""
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
          exchange: (company.exchange as string) ?? undefined,
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
}

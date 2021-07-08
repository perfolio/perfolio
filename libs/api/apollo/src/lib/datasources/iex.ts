import { DataSource } from "apollo-datasource"
import { Company, IssueType } from "@perfolio/api/graphql"
import { getCompany as getCompanyFromCloud,getLogo as getLogoFromCloud} from "@perfolio/integrations/iexcloud"

export class DataSourceIEX extends DataSource {
  constructor() {
    super()
  }

  public async getLogo(ticker:string):Promise<string> {
    const res =  await getLogoFromCloud(ticker)
    return res.url ?? ""
  }

  public async getCompany(ticker: string): Promise<Omit<Company, "logo"> | null> {
    const company= await getCompanyFromCloud(ticker).catch(() => {
        // ignore error, this is quite likely to happen
        return undefined
      })
      /**
     * Transform company from iex schema to one we want to use.
     */
    return company
      ? {
          name: company.companyName ?? undefined,
          /**
           * Copy the rest
           */
          ticker: ticker,
          exchange: company.exchange ?? undefined,
          industry: company.industry ?? undefined,
          website: company.website ?? undefined,
          description: company.description ?? undefined,
          ceo: company.CEO ?? undefined,
          issueType: company as unknown as IssueType ?? undefined,
          sector: company.sector ?? undefined,
          employees: company.employees ?? undefined,
          securityName: company.securityName ?? undefined,
          primarySicCode: company.primarySicCode ?? undefined,
          address: company.address ?? undefined,
          address2: company.address2 ?? undefined,
          tags: company.tags ?? undefined,
          state: company.state ?? undefined,
          city: company.city ?? undefined,
          zip: company.zip ?? undefined,
          country: company.country ?? undefined,
          phone: company.phone ?? undefined,
        }
      : null
  
  }
}

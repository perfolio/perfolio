import { z } from "zod"
import {
  getCompany as getCompanyFromCloud,
  getLogo as getLogoFromCloud,
} from "@perfolio/integrations/iexcloud"
import { Cache, Key } from "@perfolio/integrations/redis"
import { Company } from "@perfolio/types"
export const GetCompanyRequestValidation = z.object({
  ticker: z.string(),
})

export type GetCompanyRequest = z.infer<typeof GetCompanyRequestValidation>
export type GetCompanyResponse = Company

export async function getCompany({ ticker }: GetCompanyRequest): Promise<GetCompanyResponse> {
  const key = new Key("getCompany", { ticker })

  let company = await Cache.get<Company>(key)
  if (company) {
    return company
  }

  const [newCompany, logo] = await Promise.all([
    getCompanyFromCloud(ticker),
    getLogoFromCloud(ticker),
  ])

  /**
   * Transform company from iex schema to one we want to use.
   */
  company = {
    logo: logo.url,
    name: newCompany.companyName,

    /**
     * Copy the rest
     */
    ticker: ticker,
    exchange: newCompany.exchange,
    industry: newCompany.industry,
    website: newCompany.website,
    description: newCompany.description,
    ceo: newCompany.CEO,
    issueType: newCompany.issueType,
    sector: newCompany.sector,
    employees: newCompany.employees,
    securityName: newCompany.securityName,
    primarySicCode: newCompany.primarySicCode,
    address: newCompany.address,
    address2: newCompany.address2,
    tags: newCompany.tags,
    state: newCompany.state,
    city: newCompany.city,
    zip: newCompany.zip,
    country: newCompany.country,
    phone: newCompany.phone,
  }

  await Cache.set(key, company, 30 * 24 * 60 * 60) // 30 days
  return company
}

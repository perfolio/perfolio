import { z } from "zod"
import { getCompany as getCompanyFromCloud, getLogo as getLogoFromCloud } from "@perfolio/iexcloud"
import { Cache } from "@perfolio/cache"
import { Company } from "@perfolio/types"
export const GetCompanyRequestValidation = z.object({
  symbol: z.string(),
})

export type GetCompanyRequest = z.infer<typeof GetCompanyRequestValidation>
export type GetCompanyResponse = Company

export async function getCompany({ symbol }: GetCompanyRequest): Promise<GetCompanyResponse> {
  let company = await Cache.get<Company>(symbol)
  if (company) {
    return company
  }

  const [newCompany, logo] = await Promise.all([
    getCompanyFromCloud(symbol),
    getLogoFromCloud(symbol),
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
    symbol: symbol,
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

  await Cache.set(symbol, company)
  return company
}

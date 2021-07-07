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
export type GetCompanyResponse = Company | null

export async function getCompany({ ticker }: GetCompanyRequest): Promise<GetCompanyResponse> {
  const key = new Key("getCompany", { ticker })

  let company = await Cache.get<Company>(key)
  if (company) {
    return company
  }

  const [newCompany, logo] = await Promise.all([
    getCompanyFromCloud(ticker).catch(() => {
      // ignore error, this is quite likely to happen
      return undefined
    }),
    getLogoFromCloud(ticker).catch(() => {
      // ignore error, this is quite likely to happen
      return undefined
    }),
  ])

  /**
   * Transform company from iex schema to one we want to use.
   */
  company = newCompany
    ? {
        logo: logo?.url ?? "",
        name: newCompany.companyName ?? undefined,

        /**
         * Copy the rest
         */
        ticker: ticker,
        exchange: newCompany.exchange ?? undefined,
        industry: newCompany.industry ?? undefined,
        website: newCompany.website ?? undefined,
        description: newCompany.description ?? undefined,
        ceo: newCompany.CEO ?? undefined,
        issueType: newCompany.issueType ?? undefined,
        sector: newCompany.sector ?? undefined,
        employees: newCompany.employees ?? undefined,
        securityName: newCompany.securityName ?? undefined,
        primarySicCode: newCompany.primarySicCode ?? undefined,
        address: newCompany.address ?? undefined,
        address2: newCompany.address2 ?? undefined,
        tags: newCompany.tags ?? undefined,
        state: newCompany.state ?? undefined,
        city: newCompany.city ?? undefined,
        zip: newCompany.zip ?? undefined,
        country: newCompany.country ?? undefined,
        phone: newCompany.phone ?? undefined,
      }
    : null

  await Cache.set(key, company, 24 * 60 * 60) // 1 day
  return company
}

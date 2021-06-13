import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "../../../../lib"
import { z } from "zod"
import { db } from "@perfolio/db"
import { getCompany as getCompanyFromCloud, getLogo as getLogoFromCloud } from "@perfolio/iexcloud"

export const GetCompanyRequestValidation = z.object({
  symbol: z.string(),
})

export type GetCompanyRequest = z.infer<typeof GetCompanyRequestValidation>

export async function getCompany({ symbol }: GetCompanyRequest) {
  const company = await db().company.fromSymbol(symbol)
  if (company) {
    return company
  }

  const [newCompany, logo] = await Promise.all([
    getCompanyFromCloud(symbol),
    getLogoFromCloud(symbol),
  ])
  return db().company.create({
    symbol: symbol,
    logo: logo.url,
    /**
     * IEX Cloud returns null on some fields but it's easier to work with undefined
     * in fauna. so we convert to undefined
     */
    name: newCompany.companyName ?? undefined,
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
    state: newCompany.state ?? undefined,
    city: newCompany.city ?? undefined,
    zip: newCompany.zip ?? undefined,
    country: newCompany.country ?? undefined,
    phone: newCompany.phone ?? undefined,
  })
}

export default use(getCompany, [
  withPreflightChecks,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

import { withMiddleware } from "@perfolio/api"

import { db } from "@perfolio/db"
import { z } from "zod"
import { getCompany, getLogo } from "@perfolio/iexcloud"

export const GetCompanyRequestValidation = z.object({
  symbol: z.string(),
})

export type GetCompanyRequest = z.infer<typeof GetCompanyRequestValidation>

async function getCompanyApiHandler({ symbol }: GetCompanyRequest) {
  const company = await db().company.fromSymbol(symbol)
  if (company) {
    return company
  }

  const [newCompany, logo] = await Promise.all([getCompany(symbol), getLogo(symbol)])
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

export default withMiddleware(getCompanyApiHandler, GetCompanyRequestValidation)

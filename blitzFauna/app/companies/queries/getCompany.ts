import { resolver } from "blitz"
import { CompanyDocument } from "db/documents/company"
import {
  getCompany as getCompanyFromCloud,
  getLogo,
} from "integrations/iexcloud"
import { z } from "zod"
import createCompany from "../mutations/createCompany"
export default resolver.pipe(
  resolver.zod(z.object({ symbol: z.string() })),
  resolver.authorize(),
  async ({ symbol }, ctx) => {
    const token = process.env.FAUNA_SERVER_KEY!

    let companyDocument = await CompanyDocument.fromSymbol(symbol, token)
    if (!!companyDocument) {
      return companyDocument
    }

    const [company, logo] = await Promise.all([
      getCompanyFromCloud(symbol),
      getLogo(symbol),
    ])
    return createCompany(
      {
        symbol: symbol,
        logo: logo.url,
        /**
         * IEX Cloud returns null on some fields but it's easier to work with undefined
         * in fauna. so we convert to undefined
         */
        name: company.companyName ?? undefined,
        exchange: company.exchange ?? undefined,
        industry: company.industry ?? undefined,
        website: company.website ?? undefined,
        description: company.description ?? undefined,
        ceo: company.CEO ?? undefined,
        issueType: company.issueType ?? undefined,
        sector: company.sector ?? undefined,
        employees: company.employees ?? undefined,
        securityName: company.securityName ?? undefined,
        primarySicCode: company.primarySicCode ?? undefined,
        address: company.address ?? undefined,
        address2: company.address2 ?? undefined,
        state: company.state ?? undefined,
        city: company.city ?? undefined,
        zip: company.zip ?? undefined,
        country: company.country ?? undefined,
        phone: company.phone ?? undefined,
      },
      ctx,
    )
  },
)

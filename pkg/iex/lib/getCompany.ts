import { Company } from ".prisma/client"
import db from "db"
import {
  getCompany as getCompanyFromCloud,
  getLogo,
} from "integrations/iexcloud"
import * as z from "zod"

export const GetCompanyRequestValidation = z.object({
  symbol: z.string(),
})

export type GetCompanyRequest = z.infer<typeof GetCompanyRequestValidation>

export type GetCompanyResponse = {
  company: Company
}

export async function getCompany(
  req: GetCompanyRequest,
): Promise<GetCompanyResponse> {
  /**
   * Clean the symbol by removing country prefixes and exchange suffixes.
   * Those might not throw an error when querying iex but they will return no useful data.
   */
  let symbol = req.symbol.toLowerCase()
  if (symbol.includes("_")) {
    symbol = symbol.split("_")[1]!
  }
  if (symbol.includes("-")) {
    symbol = symbol.split("-")[0]!
  }

  let company = await db.symbol.findUnique({ where: { symbol } }).company()

  if (!company) {
    const [companyRaw, logo] = await Promise.all([
      getCompanyFromCloud(symbol),
      getLogo(symbol),
    ])

    company = await db.company.create({
      data: {
        symbol: {
          connectOrCreate: {
            where: { symbol },
            create: { symbol },
          },
        },
        logo: logo.url,
        name: companyRaw.companyName,
        exchange: companyRaw.exchange,
        industry: companyRaw.industry,
        website: companyRaw.website,
        description: companyRaw.description,
        ceo: companyRaw.CEO,
        issueType: companyRaw.issueType,
        sector: companyRaw.sector,
        employees: companyRaw.employees,
        securityName: companyRaw.securityName,
        primarySicCode: companyRaw.primarySicCode,
        address: companyRaw.address,
        address2: companyRaw.address2,
        state: companyRaw.state,
        city: companyRaw.city,
        zip: companyRaw.zip,
        country: companyRaw.country,
        phone: companyRaw.phone,
      },
    })
  }

  return { company }
}

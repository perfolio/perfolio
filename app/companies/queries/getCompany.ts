import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"
import { Cloud } from "integrations/iexcloud"
const GetCompany = z.object({
  isin: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/),
})

export default resolver.pipe(resolver.zod(GetCompany), resolver.authorize(), async ({ isin }) => {
  let company = await db.company.findUnique({ where: { isin } })

  if (!company) {
    const api = new Cloud()
    const res = await api.getCompany({ isin })
    const logo = await api.getLogo({ symbol: res.symbol })
    company = await db.company.create({
      data: {
        isin,
        symbol: res.symbol,
        logo: logo.url,
        name: res.companyName,
        exchange: res.exchange,
        industry: res.industry,
        website: res.website,
        description: res.description,
        ceo: res.CEO,
        issueType: res.issueType,
        sector: res.sector,
        employees: res.employees,
        securityName: res.securityName,
        primarySICCode: res.primarySicCode,
        address: res.address,
        address2: res.address2,
        state: res.state,
        city: res.city,
        zip: res.zip,
        country: res.country,
        phone: res.phone,
      },
    })
  }
  if (!company) throw NotFoundError
  return company
})

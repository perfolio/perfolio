import { resolver } from "blitz"
import { CreateCompanyValidation, CompanyDocument } from "db"
import { z } from "zod"

export default resolver.pipe(
  resolver.zod(CreateCompanyValidation),
  resolver.authorize(),
  async (company) => {
    const token = process.env.FAUNA_SERVER_KEY!
    return CompanyDocument.create(company, token)
  },
)

import { resolver } from "blitz"
import { db, Company } from "db"

export default resolver.pipe(
  resolver.zod(Company.schema),
  resolver.authorize(),
  async (company) => {
    return db.company.create(company)
  },
)

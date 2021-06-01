import { resolver } from "blitz"
import { getCompany, GetCompanyRequestValidation } from "pkg/iex"

export default resolver.pipe(
  resolver.zod(GetCompanyRequestValidation),
  resolver.authorize(),
  async ({ symbol }) => {
    return getCompany({ symbol })
  },
)

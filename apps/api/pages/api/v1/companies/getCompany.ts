import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/api/feature/lambda"

export default use(getCompany, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/lambda"

export default use(getCompany, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

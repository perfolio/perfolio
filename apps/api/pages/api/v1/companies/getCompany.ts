import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/lambda"

export default use(getCompany, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

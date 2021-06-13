import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withOptions,
} from "@perfolio/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/lambda"

export default use(getCompany, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/lambda"

export default use(getCompany, [
  withContentTypeJson,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

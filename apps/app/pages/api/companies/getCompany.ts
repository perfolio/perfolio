import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/api/feature/lambda"

export default use(getCompany, [
  withContentTypeJson,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
  withMetrics,
])

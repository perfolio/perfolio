import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/lambda"

export default use(getCompany, [
  withPreflightChecks,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

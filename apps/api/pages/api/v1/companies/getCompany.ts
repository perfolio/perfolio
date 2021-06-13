import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  allowCors,
} from "@perfolio/middleware"
import { getCompany, GetCompanyRequestValidation } from "@perfolio/lambda"

export default use(getCompany, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(GetCompanyRequestValidation),
  withAuthentication,
])

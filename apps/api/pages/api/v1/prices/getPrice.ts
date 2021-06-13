import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/lambda"
export default use(getPrice, [
  withPreflightChecks,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

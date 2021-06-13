import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"
import { getPrices, GetPricesRequestValidation } from "@perfolio/lambda"
export default use(getPrices, [
  withPreflightChecks,
  withRequestValidation(GetPricesRequestValidation),
  withAuthentication,
])

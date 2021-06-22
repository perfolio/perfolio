import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/api/feature/middleware"
import { getPrices, GetPricesRequestValidation } from "@perfolio/api/feature/lambda"
export default use(getPrices, [
  withContentTypeJson,
  withRequestValidation(GetPricesRequestValidation),
  withAuthentication,
])

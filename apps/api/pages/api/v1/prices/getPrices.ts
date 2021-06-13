import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withOptions,
} from "@perfolio/middleware"
import { getPrices, GetPricesRequestValidation } from "@perfolio/lambda"
export default use(getPrices, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(GetPricesRequestValidation),
  withAuthentication,
])

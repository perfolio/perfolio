import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { getPrices, GetPricesRequestValidation } from "@perfolio/lambda"
export default use(getPrices, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(GetPricesRequestValidation),
  withAuthentication,
])

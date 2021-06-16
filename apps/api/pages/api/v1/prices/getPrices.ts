import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/middleware"
import { getPrices, GetPricesRequestValidation } from "@perfolio/lambda"
export default use(getPrices, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(GetPricesRequestValidation),
  withAuthentication,
])

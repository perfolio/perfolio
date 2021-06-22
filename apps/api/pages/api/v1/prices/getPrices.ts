import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { getPrices, GetPricesRequestValidation } from "@perfolio/api/feature/lambda"
export default use(getPrices, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(GetPricesRequestValidation),
  withAuthentication,
])

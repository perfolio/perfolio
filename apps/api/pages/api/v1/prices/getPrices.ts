import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  allowCors,
} from "@perfolio/middleware"
import { getPrices, GetPricesRequestValidation } from "@perfolio/lambda"
export default use(getPrices, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(GetPricesRequestValidation),
  withAuthentication,
])

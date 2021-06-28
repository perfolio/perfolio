import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/api/feature/lambda"
export default use(getPrice, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

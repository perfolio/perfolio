import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getTickerFromFigi, getTickerFromFigiRequestValidation } from "@perfolio/api/feature/lambda"

export default use(getTickerFromFigi, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(getTickerFromFigiRequestValidation),
  withAuthentication,
])

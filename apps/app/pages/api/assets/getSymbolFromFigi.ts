import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getSymbolFromFigi, GetSymbolFromFigiRequestValidation } from "@perfolio/api/feature/lambda"

export default use(getSymbolFromFigi, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(GetSymbolFromFigiRequestValidation),
  withAuthentication,
])

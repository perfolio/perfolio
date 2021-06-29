import {
  withContentTypeJson,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getExchanges } from "@perfolio/api/feature/lambda"

export default use(getExchanges, [withMetrics, withContentTypeJson, withAuthentication])

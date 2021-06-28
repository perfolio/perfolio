import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/api/feature/lambda"

export default use(subscribe, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(SubscribeRequestValidation),
])

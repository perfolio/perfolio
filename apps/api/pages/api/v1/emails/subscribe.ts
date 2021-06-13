import { withPreflightChecks, withRequestValidation, use } from "@perfolio/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/lambda"

export default use(subscribe, [
  withPreflightChecks,
  withRequestValidation(SubscribeRequestValidation),
])

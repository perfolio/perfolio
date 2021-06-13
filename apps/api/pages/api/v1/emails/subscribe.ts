import { withContentTypeJson, withRequestValidation, use } from "@perfolio/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/lambda"

export default use(subscribe, [
  withContentTypeJson,
  withRequestValidation(SubscribeRequestValidation),
])

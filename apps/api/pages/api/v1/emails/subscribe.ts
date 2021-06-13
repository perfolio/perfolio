import { withContentTypeJson, withRequestValidation, use, withOptions } from "@perfolio/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/lambda"

export default use(subscribe, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(SubscribeRequestValidation),
])

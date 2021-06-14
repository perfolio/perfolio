import { withContentTypeJson, withRequestValidation, use, withCors } from "@perfolio/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/lambda"

export default use(subscribe, [
  withCors(),
  withContentTypeJson,
  withRequestValidation(SubscribeRequestValidation),
])

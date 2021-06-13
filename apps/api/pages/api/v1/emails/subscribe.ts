import { withContentTypeJson, withRequestValidation, use, allowCors } from "@perfolio/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/lambda"

export default use(subscribe, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(SubscribeRequestValidation),
])

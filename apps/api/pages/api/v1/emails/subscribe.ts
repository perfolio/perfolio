import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/lambda"

export default use(subscribe, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(SubscribeRequestValidation),
])

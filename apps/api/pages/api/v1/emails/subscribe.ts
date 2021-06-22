import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withCors,
} from "@perfolio/api/feature/middleware"
import { subscribe, SubscribeRequestValidation } from "@perfolio/api/feature/lambda"

export default use(subscribe, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(SubscribeRequestValidation),
])

import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/lambda"
export default use(getPrice, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

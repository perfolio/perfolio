import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/lambda"
export default use(getPrice, [
  withCors(),
  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

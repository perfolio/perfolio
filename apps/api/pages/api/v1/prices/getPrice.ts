import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withOptions,
} from "@perfolio/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/lambda"
export default use(getPrice, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

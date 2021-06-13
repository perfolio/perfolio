import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/lambda"
export default use(getPrice, [
  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

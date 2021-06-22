import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/api/feature/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/api/feature/lambda"
export default use(getPrice, [
  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  allowCors,
} from "@perfolio/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/lambda"
export default use(getPrice, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

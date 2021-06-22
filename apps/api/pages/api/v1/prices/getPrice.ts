import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { getPrice, GetPriceRequestValidation } from "@perfolio/api/feature/lambda"
export default use(getPrice, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(GetPriceRequestValidation),
  withAuthentication,
])

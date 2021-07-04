import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { search, SearchRequestValidation } from "@perfolio/api/feature/lambda"

export default use(search, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(SearchRequestValidation),
  withAuthentication,
])

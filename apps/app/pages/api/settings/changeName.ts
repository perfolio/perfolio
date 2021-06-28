import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { changeName, ChangeNameRequestValidation } from "@perfolio/api/feature/lambda"

export default use(changeName, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(ChangeNameRequestValidation),
  withAuthentication,
])

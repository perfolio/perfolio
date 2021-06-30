import {
  withContentTypeJson,
  use,
  withAuthentication,
  withMetrics,
  withRequestValidation,
} from "@perfolio/api/feature/middleware"
import { createSettings, CreateSettingsRequestValidation } from "@perfolio/api/feature/lambda"

export default use(createSettings, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(CreateSettingsRequestValidation),
  withAuthentication,
])

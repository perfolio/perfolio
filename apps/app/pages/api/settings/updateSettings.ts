import {
  withContentTypeJson,
  use,
  withAuthentication,
  withMetrics,
  withRequestValidation,
} from "@perfolio/api/feature/middleware"
import { updateSettings } from "@perfolio/api/feature/lambda"
import { UdpdateSettingsRequestValidation } from "@perfolio/api/feature/lambda"

export default use(updateSettings, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(UdpdateSettingsRequestValidation),
  withAuthentication,
])

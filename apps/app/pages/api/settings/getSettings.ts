import {
  withContentTypeJson,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getSettings } from "@perfolio/api/feature/lambda"

export default use(getSettings, [withMetrics, withContentTypeJson, withAuthentication])

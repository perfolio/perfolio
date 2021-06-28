import {
  withMetrics,
  withContentTypeJson,
  use,
  withAuthentication,
} from "@perfolio/api/feature/middleware"
import { getHistory } from "@perfolio/api/feature/lambda"

export default use(getHistory, [withMetrics, withContentTypeJson, withAuthentication])

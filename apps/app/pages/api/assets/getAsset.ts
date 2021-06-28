import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/api/feature/lambda"

export default use(getAsset, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

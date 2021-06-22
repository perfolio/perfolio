import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/api/feature/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/api/feature/lambda"

export default use(getAsset, [
  withContentTypeJson,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

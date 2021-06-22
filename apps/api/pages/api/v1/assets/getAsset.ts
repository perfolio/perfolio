import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/api/feature/lambda"

export default use(getAsset, [
  withCors(),
  withContentTypeJson,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

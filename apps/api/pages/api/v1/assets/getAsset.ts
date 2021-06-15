import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/lambda"

export default use(getAsset, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

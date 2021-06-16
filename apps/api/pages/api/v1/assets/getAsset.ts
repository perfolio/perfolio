import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/lambda"

export default use(getAsset, [
  withCors(),
  withContentTypeJson,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withOptions,
} from "@perfolio/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/lambda"

export default use(getAsset, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

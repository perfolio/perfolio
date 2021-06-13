import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  allowCors,
} from "@perfolio/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/lambda"

export default use(getAsset, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

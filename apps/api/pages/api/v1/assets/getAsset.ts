import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"
import { getAsset, GetAssetRequestValidation } from "@perfolio/lambda"

export default use(getAsset, [
  withPreflightChecks,
  withRequestValidation(GetAssetRequestValidation),
  withAuthentication,
])

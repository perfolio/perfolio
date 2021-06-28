import {
  withContentTypeJson,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { deleteAccount } from "@perfolio/api/feature/lambda"

export default use(deleteAccount, [withContentTypeJson, withAuthentication, withMetrics])

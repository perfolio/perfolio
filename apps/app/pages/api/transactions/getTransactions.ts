import {
  withContentTypeJson,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import { getTransactions } from "@perfolio/api/feature/lambda"

export default use(getTransactions, [withMetrics, withContentTypeJson, withAuthentication])

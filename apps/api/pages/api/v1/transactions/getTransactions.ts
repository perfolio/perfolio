import {
  withContentTypeJson,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { getTransactions } from "@perfolio/api/feature/lambda"

export default use(getTransactions, [withCors(), withContentTypeJson, withAuthentication])

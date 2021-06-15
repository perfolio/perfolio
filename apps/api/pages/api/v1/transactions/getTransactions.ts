import {
  withContentTypeJson,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { getTransactions } from "@perfolio/lambda"

export default use(getTransactions, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withAuthentication,
])

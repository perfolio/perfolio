import { withContentTypeJson, use, withAuthentication, withCors } from "@perfolio/middleware"
import { refresh } from "@perfolio/lambda"

export default use(refresh, [
  withCors("https://app.perfol.io"),
  withContentTypeJson,
  withAuthentication,
])

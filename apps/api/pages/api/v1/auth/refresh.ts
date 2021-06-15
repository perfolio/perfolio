import { withContentTypeJson, use, withAuthentication, withCors } from "@perfolio/middleware"
import { refresh } from "@perfolio/lambda"

export default use(refresh, [
  withCors(process.env.NODE_ENV === "production" ? "https://app.perfol.io" : undefined),

  withContentTypeJson,
  withAuthentication,
])

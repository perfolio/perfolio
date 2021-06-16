import { withContentTypeJson, withAuthentication, use, withCors } from "@perfolio/middleware"
import { signout } from "@perfolio/lambda"
export default use(signout, [
  withCors(process.env.NODE_ENV === "production" ? "https://app.perfol.io" : undefined),

  withContentTypeJson,
  withAuthentication,
])

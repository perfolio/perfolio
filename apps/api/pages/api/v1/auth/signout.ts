import { withContentTypeJson, withAuthentication, use, withCors } from "@perfolio/middleware"
import { signout } from "@perfolio/lambda"
export default use(signout, [
  withCors("https://app.perfol.io"),
  withContentTypeJson,
  withAuthentication,
])

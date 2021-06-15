import {
  withContentTypeJson,
  withAuthentication,
  use,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { signout } from "@perfolio/lambda"
export default use(signout, [
  withCors(process.env.NODE_ENV === "production" ? "https://app.perfol.io" : undefined),
  withSentry,
  withContentTypeJson,
  withAuthentication,
])

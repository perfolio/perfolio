import { signin, SigninRequestValidation } from "@perfolio/lambda"

import {
  use,
  withCors,
  withContentTypeJson,
  withRequestValidation,
  withSentry,
} from "@perfolio/middleware"

export default use(signin, [
  withCors(process.env.NODE_ENV === "production" ? "https://app.perfol.io" : undefined),
  withSentry,
  withContentTypeJson,
  withRequestValidation(SigninRequestValidation),
])

import { signin, SigninRequestValidation } from "@perfolio/lambda"

import { use, withCors, withContentTypeJson, withRequestValidation } from "@perfolio/middleware"

export default use(signin, [
  withCors(process.env.NODE_ENV === "production" ? "https://app.perfol.io" : undefined),
  withContentTypeJson,
  withRequestValidation(SigninRequestValidation),
])

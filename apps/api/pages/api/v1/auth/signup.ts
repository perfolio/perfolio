import { withContentTypeJson, withRequestValidation, use, withCors } from "@perfolio/middleware"

import { signup, SignupRequestValidation } from "@perfolio/lambda"
export default use(signup, [
  withCors(process.env.NODE_ENV === "production" ? "https://app.perfol.io" : undefined),

  withContentTypeJson,
  withRequestValidation(SignupRequestValidation),
])

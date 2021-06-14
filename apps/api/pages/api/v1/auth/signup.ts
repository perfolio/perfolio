import { withContentTypeJson, withRequestValidation, use, withCors } from "@perfolio/middleware"

import { signup, SignupRequestValidation } from "@perfolio/lambda"
export default use(signup, [
  withCors("https://app.perfol.io"),
  withContentTypeJson,
  withRequestValidation(SignupRequestValidation),
])

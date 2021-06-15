import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withCors,
  withSentry,
} from "@perfolio/middleware"

import { signup, SignupRequestValidation } from "@perfolio/lambda"
export default use(signup, [
  withCors(process.env.NODE_ENV === "production" ? "https://app.perfol.io" : undefined),
  withSentry,
  withContentTypeJson,
  withRequestValidation(SignupRequestValidation),
])

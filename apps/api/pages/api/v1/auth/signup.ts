import { withContentTypeJson, withRequestValidation, use, withOptions } from "@perfolio/middleware"

import { signup, SignupRequestValidation } from "@perfolio/lambda"
export default use(signup, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(SignupRequestValidation),
])

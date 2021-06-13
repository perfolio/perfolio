import { withContentTypeJson, withRequestValidation, use, allowCors } from "@perfolio/middleware"

import { signup, SignupRequestValidation } from "@perfolio/lambda"
export default use(signup, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(SignupRequestValidation),
])

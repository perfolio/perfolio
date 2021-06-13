import { withContentTypeJson, withRequestValidation, use, withOptions } from "@perfolio/middleware"
import { signin, SigninRequestValidation } from "@perfolio/lambda"

export default use(signin, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(SigninRequestValidation),
])

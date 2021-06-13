import { withContentTypeJson, withRequestValidation, use, allowCors } from "@perfolio/middleware"
import { signin, SigninRequestValidation } from "@perfolio/lambda"

export default use(signin, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(SigninRequestValidation),
])

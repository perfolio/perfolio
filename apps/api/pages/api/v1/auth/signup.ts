import { withPreflightChecks, withRequestValidation, use } from "@perfolio/middleware"

import { signup, SignupRequestValidation } from "@perfolio/lambda"
export default use(signup, [withPreflightChecks, withRequestValidation(SignupRequestValidation)])

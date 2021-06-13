import { withContentTypeJson, withRequestValidation, use } from "@perfolio/middleware"
import { signin, SigninRequestValidation } from "@perfolio/lambda"

export default use(signin, [withContentTypeJson, withRequestValidation(SigninRequestValidation)])

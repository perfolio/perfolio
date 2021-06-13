import { withContentTypeJson, withAuthentication, use, withOptions } from "@perfolio/middleware"
import { signout } from "@perfolio/lambda"
export default use(signout, [withOptions, withContentTypeJson, withAuthentication])

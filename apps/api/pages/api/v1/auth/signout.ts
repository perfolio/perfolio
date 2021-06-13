import { withPreflightChecks, withAuthentication, use } from "@perfolio/middleware"
import { signout } from "@perfolio/lambda"
export default use(signout, [withPreflightChecks, withAuthentication])

import { withPreflightChecks, use, withAuthentication } from "@perfolio/middleware"
import { refresh } from "@perfolio/lambda"

export default use(refresh, [withPreflightChecks, withAuthentication])

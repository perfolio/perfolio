import { withPreflightChecks, use, withAuthentication } from "@perfolio/middleware"
import { getHistory } from "@perfolio/lambda"

export default use(getHistory, [withPreflightChecks, withAuthentication])

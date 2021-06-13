import { withPreflightChecks, use, withAuthentication } from "@perfolio/middleware"
import { getTransactions } from "@perfolio/lambda"

export default use(getTransactions, [withPreflightChecks, withAuthentication])

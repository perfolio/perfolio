import { withContentTypeJson, use, withAuthentication } from "@perfolio/api/feature/middleware"
import { getTransactions } from "@perfolio/api/feature/lambda"

export default use(getTransactions, [withContentTypeJson, withAuthentication])

import { withContentTypeJson, use, withAuthentication } from "@perfolio/middleware"
import { getTransactions } from "@perfolio/lambda"

export default use(getTransactions, [withContentTypeJson, withAuthentication])

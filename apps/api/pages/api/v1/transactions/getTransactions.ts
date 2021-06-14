import { withContentTypeJson, use, withAuthentication, withCors } from "@perfolio/middleware"
import { getTransactions } from "@perfolio/lambda"

export default use(getTransactions, [withCors(), withContentTypeJson, withAuthentication])

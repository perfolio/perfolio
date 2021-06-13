import { withContentTypeJson, use, withAuthentication, allowCors } from "@perfolio/middleware"
import { getTransactions } from "@perfolio/lambda"

export default use(getTransactions, [allowCors, withContentTypeJson, withAuthentication])

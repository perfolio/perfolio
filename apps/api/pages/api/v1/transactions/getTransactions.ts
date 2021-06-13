import { withContentTypeJson, use, withAuthentication, withOptions } from "@perfolio/middleware"
import { getTransactions } from "@perfolio/lambda"

export default use(getTransactions, [withOptions, withContentTypeJson, withAuthentication])

import { withContentTypeJson, use, withAuthentication, allowCors } from "@perfolio/middleware"
import { getHistory } from "@perfolio/lambda"

export default use(getHistory, [allowCors, withContentTypeJson, withAuthentication])

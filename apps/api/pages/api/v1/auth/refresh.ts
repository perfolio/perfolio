import { withContentTypeJson, use, withAuthentication, allowCors } from "@perfolio/middleware"
import { refresh } from "@perfolio/lambda"

export default use(refresh, [allowCors, withContentTypeJson, withAuthentication])

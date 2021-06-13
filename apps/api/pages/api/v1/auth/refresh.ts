import { withContentTypeJson, use, withAuthentication, withOptions } from "@perfolio/middleware"
import { refresh } from "@perfolio/lambda"

export default use(refresh, [withOptions, withContentTypeJson, withAuthentication])

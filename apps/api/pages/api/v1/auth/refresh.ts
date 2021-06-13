import { withContentTypeJson, use, withAuthentication } from "@perfolio/middleware"
import { refresh } from "@perfolio/lambda"

export default use(refresh, [withContentTypeJson, withAuthentication])

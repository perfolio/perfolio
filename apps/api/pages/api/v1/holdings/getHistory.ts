import { withContentTypeJson, use, withAuthentication } from "@perfolio/middleware"
import { getHistory } from "@perfolio/lambda"

export default use(getHistory, [withContentTypeJson, withAuthentication])

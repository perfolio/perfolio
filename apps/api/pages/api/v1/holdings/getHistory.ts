import { withContentTypeJson, use, withAuthentication, withCors } from "@perfolio/middleware"
import { getHistory } from "@perfolio/lambda"

export default use(getHistory, [withCors(), withContentTypeJson, withAuthentication])

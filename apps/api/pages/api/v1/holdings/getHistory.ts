import { withContentTypeJson, use, withAuthentication, withOptions } from "@perfolio/middleware"
import { getHistory } from "@perfolio/lambda"

export default use(getHistory, [withOptions, withContentTypeJson, withAuthentication])

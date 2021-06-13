import { withContentTypeJson, withAuthentication, use, allowCors } from "@perfolio/middleware"
import { signout } from "@perfolio/lambda"
export default use(signout, [allowCors, withContentTypeJson, withAuthentication])

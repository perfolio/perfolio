import {
  withContentTypeJson,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { getHistory } from "@perfolio/lambda"

export default use(getHistory, [withCors(), withSentry, withContentTypeJson, withAuthentication])

import {
  withContentTypeJson,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { getHistory } from "@perfolio/api/feature/lambda"

export default use(getHistory, [withCors(), withContentTypeJson, withAuthentication])

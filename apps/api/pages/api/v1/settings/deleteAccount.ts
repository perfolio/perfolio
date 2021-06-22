import {
  withContentTypeJson,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { deleteAccount } from "@perfolio/api/feature/lambda"

export default use(deleteAccount, [withCors(), withContentTypeJson, withAuthentication])

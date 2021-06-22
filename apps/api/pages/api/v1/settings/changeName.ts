import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"
import { changeName, ChangeNameRequestValidation } from "@perfolio/api/feature/lambda"

export default use(changeName, [
  withCors(),
  withContentTypeJson,
  withRequestValidation(ChangeNameRequestValidation),
  withAuthentication,
])

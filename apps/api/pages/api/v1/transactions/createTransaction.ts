import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"

import { createTransaction, CreateTransactionRequestValidation } from "@perfolio/lambda"
export default use(createTransaction, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
])

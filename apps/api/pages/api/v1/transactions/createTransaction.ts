import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/middleware"

import { createTransaction, CreateTransactionRequestValidation } from "@perfolio/lambda"
export default use(createTransaction, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
])

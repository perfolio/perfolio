import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"

import { createTransaction, CreateTransactionRequestValidation } from "@perfolio/api/feature/lambda"
export default use(createTransaction, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
])

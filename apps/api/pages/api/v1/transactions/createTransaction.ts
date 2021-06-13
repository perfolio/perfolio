import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withOptions,
} from "@perfolio/middleware"

import { createTransaction, CreateTransactionRequestValidation } from "@perfolio/lambda"
export default use(createTransaction, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
])

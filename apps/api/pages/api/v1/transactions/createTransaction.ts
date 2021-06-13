import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"

import { createTransaction, CreateTransactionRequestValidation } from "@perfolio/lambda"
export default use(createTransaction, [
  withContentTypeJson,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
])

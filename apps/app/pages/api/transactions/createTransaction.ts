import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"

import { createTransaction, CreateTransactionRequestValidation } from "@perfolio/api/feature/lambda"
export default use(createTransaction, [
  withContentTypeJson,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
  withMetrics,
])

import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"

import { createTransaction, CreateTransactionRequestValidation } from "@perfolio/lambda"
export default use(createTransaction, [
  withPreflightChecks,
  withRequestValidation(CreateTransactionRequestValidation),
  withAuthentication,
])

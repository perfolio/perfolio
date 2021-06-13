import {
  withPreflightChecks,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/lambda"
export default use(deleteTransaction, [
  withPreflightChecks,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

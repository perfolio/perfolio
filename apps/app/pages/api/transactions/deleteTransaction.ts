import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withMetrics,
} from "@perfolio/api/feature/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/api/feature/lambda"
export default use(deleteTransaction, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

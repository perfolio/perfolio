import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/api/feature/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/api/feature/lambda"
export default use(deleteTransaction, [
  withContentTypeJson,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

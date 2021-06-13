import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
} from "@perfolio/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/lambda"
export default use(deleteTransaction, [
  withContentTypeJson,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

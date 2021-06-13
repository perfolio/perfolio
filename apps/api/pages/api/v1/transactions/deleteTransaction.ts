import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withOptions,
} from "@perfolio/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/lambda"
export default use(deleteTransaction, [
  withOptions,
  withContentTypeJson,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

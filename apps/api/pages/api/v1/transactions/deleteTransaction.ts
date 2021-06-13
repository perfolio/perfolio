import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  allowCors,
} from "@perfolio/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/lambda"
export default use(deleteTransaction, [
  allowCors,
  withContentTypeJson,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
  withSentry,
} from "@perfolio/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/lambda"
export default use(deleteTransaction, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

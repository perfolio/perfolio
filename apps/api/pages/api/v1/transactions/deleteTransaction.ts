import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withAuthentication,
  withCors,
} from "@perfolio/api/feature/middleware"

import { deleteTransaction, DeleteTransactionRequestValidation } from "@perfolio/api/feature/lambda"
export default use(deleteTransaction, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(DeleteTransactionRequestValidation),
  withAuthentication,
])

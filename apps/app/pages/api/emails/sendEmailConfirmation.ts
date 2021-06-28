import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withMetrics,
} from "@perfolio/api/feature/middleware"
import {
  sendEmailConfirmation,
  SendEmailConfirmationRequestValidation,
} from "@perfolio/api/feature/lambda"

export default use(sendEmailConfirmation, [
  withMetrics,
  withContentTypeJson,
  withRequestValidation(SendEmailConfirmationRequestValidation),
])

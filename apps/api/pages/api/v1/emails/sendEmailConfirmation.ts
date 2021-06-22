import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withCors,
} from "@perfolio/api/feature/middleware"
import {
  sendEmailConfirmation,
  SendEmailConfirmationRequestValidation,
} from "@perfolio/api/feature/lambda"

export default use(sendEmailConfirmation, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(SendEmailConfirmationRequestValidation),
])

import { withContentTypeJson, withRequestValidation, use, withCors } from "@perfolio/middleware"
import { sendEmailConfirmation, SendEmailConfirmationRequestValidation } from "@perfolio/lambda"

export default use(sendEmailConfirmation, [
  withCors(),

  withContentTypeJson,
  withRequestValidation(SendEmailConfirmationRequestValidation),
])

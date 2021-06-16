import {
  withContentTypeJson,
  withRequestValidation,
  use,
  withCors,
  withSentry,
} from "@perfolio/middleware"
import { sendEmailConfirmation, SendEmailConfirmationRequestValidation } from "@perfolio/lambda"

export default use(sendEmailConfirmation, [
  withCors(),
  withSentry,
  withContentTypeJson,
  withRequestValidation(SendEmailConfirmationRequestValidation),
])

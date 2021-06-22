import { withContentTypeJson, withRequestValidation, use } from "@perfolio/api/feature/middleware"
import {
  sendEmailConfirmation,
  SendEmailConfirmationRequestValidation,
} from "@perfolio/api/feature/lambda"

export default use(sendEmailConfirmation, [
  withContentTypeJson,
  withRequestValidation(SendEmailConfirmationRequestValidation),
])

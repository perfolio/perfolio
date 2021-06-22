import { z } from "zod"
import { send } from "@perfolio/feature/email"
export const SendEmailConfirmationRequestValidation = z.object({
  email: z.string().email(),
})

export type SendEmailConfirmationRequest = z.infer<typeof SendEmailConfirmationRequestValidation>

export async function sendEmailConfirmation({ email }: SendEmailConfirmationRequest) {
  send(email, "Email confirmation", "hALLO")
}

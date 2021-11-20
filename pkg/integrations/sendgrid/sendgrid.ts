import { env } from "@chronark/env"
import sendgrid from "@sendgrid/mail"
export async function send(to: string, subject: string, body: string): Promise<void> {
  sendgrid.setApiKey(env.require("SENDGRID_API_KEY"))
  await sendgrid.send({
    to,
    from: "noreply@perfol.io",
    subject,
    text: body,
  })
}

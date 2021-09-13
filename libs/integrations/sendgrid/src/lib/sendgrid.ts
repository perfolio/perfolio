import sendgrid from "@sendgrid/mail"
import { env } from "@chronark/env"
export async function send(to: string, subject: string, body: string): Promise<void> {
  sendgrid.setApiKey(env.require("SENDGRID_API_KEY"))
  await sendgrid.send({
    to,
    from: "noreply@perfol.io",
    subject,
    text: body,
  })
}

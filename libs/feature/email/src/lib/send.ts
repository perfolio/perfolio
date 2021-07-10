import sg from "@sendgrid/mail"

export async function send(to: string, subject: string, text: string) {
  const apiKey = process.env["SENDGRID_TOKEN"]
  if (!apiKey) {
    throw new Error("`NX_SENDGRID_TOKEN` must be defined")
  }

  sg.setApiKey(apiKey)

  await sg
    .send({
      to,
      from: "andreas@perfol.io",
      subject,
      text,
    })
    .catch((err) => {
      throw new Error(`Unable to send email: ${err}`)
    })
}

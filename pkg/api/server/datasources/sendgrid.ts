import { DataSource } from "apollo-datasource"
import { env } from "@chronark/env"
export class Sendgrid extends DataSource {
  constructor() {
    super()
  }

  public async subscribeToNewsletter(email: string): Promise<void> {
    const apiKey = env.require("SENDGRID_TOKEN")

    const newsletterListId = "9a32d029-4d38-47d0-bd77-4315086834b6"
    const res = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: "PUT",
      body: JSON.stringify({
        list_ids: [newsletterListId],
        contacts: [{ email }],
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })
    const json = await res.json()
    if (!json.job_id) {
      throw new Error("Unable to add new email right now, please try again later")
    }
  }
}

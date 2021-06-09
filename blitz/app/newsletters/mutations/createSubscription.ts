import { resolver } from "blitz"
import { z } from "zod"

export default resolver.pipe(
  resolver.zod(
    z.object({
      email: z.string().email(),
    }),
  ),
  async ({ email }) => {
    const apiKey = process.env["SENDGRID_TOKEN"]

    const newsletterListId = "380e1c91-68ec-4152-aab7-775152c2301b"
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
      throw new Error(
        "Unable to add new email right now, please try again later",
      )
    }

    return
  },
)

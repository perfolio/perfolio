import { withMiddleware } from "@perfolio/api"
import { db } from "@perfolio/db"
import { z } from "zod"
import { getPrice } from "@perfolio/iexcloud"
import { Time } from "@perfolio/time"

export const SubscribeRequestValidation = z.object({
  email: z.string().email(),
})

export type SubscribeRequest = z.infer<typeof SubscribeRequestValidation>

async function getPriceApiHandler({ email }: SubscribeRequest) {
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
    throw new Error("Unable to add new email right now, please try again later")
  }
  return
}

export default withMiddleware(getPriceApiHandler, SubscribeRequestValidation, false)

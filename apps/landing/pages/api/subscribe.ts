import { z } from "zod"
import { env } from "@chronark/env"
import { NextApiRequest, NextApiResponse } from "next"

const validation = z.object({
  headers: z.object({
    "content-type": z.string().refine((header) => header === "application/json"),
  }),
  method: z.string().refine((method) => method === "POST"),
  body: z.object({
    email: z.string().email(),
  }),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { email },
    } = validation.parse(req)

    const apiKey = env.require("SENDGRID_TOKEN")

    const newsletterListId = "7dc122dd-2645-44e6-a3ea-af7506def367"
    const sendgridResponse = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
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
    const json = await sendgridResponse.json()
    if (!json.job_id) {
      res.status(500)
      throw new Error("Unable to add new email right now, please try again later")
    }
    res.send("ok")
  } catch (err) {
    console.error(err)
    res.send(err.message)
  } finally {
    res.end()
  }
}

export default handler

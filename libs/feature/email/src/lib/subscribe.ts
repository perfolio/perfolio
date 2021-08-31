import { useI18n } from "@perfolio/feature/i18n"

export async function subscribe(email: string) {
  const { t } = useI18n()
  const apiKey = process.env["SENDGRID_TOKEN"]
  if (!apiKey) {
    throw new Error("`NX_SENDGRID_TOKEN` must be defined")
  }
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
    throw new Error(t("emailSubsMailError"))
  }
  return
}

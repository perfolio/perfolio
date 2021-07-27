import * as z from "zod"
import { Client } from "./client"

export const TickerFromIsinResponseValidation = z.array(
  z.object({
    data: z.array(
      z.object({
        ticker: z.string(),
      }),
    ),
  }),
)
export type GetTickerFromIsinRequest = {
  isin: string
}

/**
 * Return all associated figis
 */
export async function getTickerFromIsin(req: GetTickerFromIsinRequest): Promise<string | null> {
  const client = new Client()
  const res = await client.post({
    path: "/v3/mapping",
    body: [
      {
        idType: "ID_ISIN",
        idValue: req.isin,
      },
    ],
  })
  const parsed = TickerFromIsinResponseValidation.parse(res)
  const ticker = parsed[0]?.data[0]?.ticker ?? null
  return ticker
}

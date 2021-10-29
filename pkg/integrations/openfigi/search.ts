import * as z from "zod"
import { Client } from "./client"

export const SearchResponseValidator = z.array(
  z.object({
    figi: z.string(),

    // securityType: z.string().nullable(),
    // securityType2: z.string().nullable(),
    // marketSector: z.string().nullable(),
    // exchCode: z.string().nullable(),

    // ticker: z.string().nullable(),
    // name: z.string().nullable(),
    // shareClassFIGI: z.string().nullable(),
    // compositeFIGI: z.string().nullable(),
    // securityDescription: z.string().nullable(),
  }),
)
export type SearchRequest = {
  /**
   * Whatever the user has typed into the search field.
   */
  fragment: string
  /**
   * Limit the search to a currency
   */
  currency?: string

  /**
   * Limit the search to an exchange
   */
  exchange?: string
}

/**
 * Return all associated figis
 */
export async function search(req: SearchRequest): Promise<string[]> {
  const client = new Client()
  const res = await client.post({
    path: "/v3/filter",
    body: {
      query: req.fragment,
      currency: req.currency,
      micCode: req.exchange,
    },
  })
  return SearchResponseValidator.parse(res.data).map((x) => x.figi)
}

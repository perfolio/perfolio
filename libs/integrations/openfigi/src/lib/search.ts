import * as z from "zod"
import { Client } from "./client"

export const SearchResponseValidator = z.array(
  z.object({
    figi: z.string(),

    securityType: z.string().nullable(),
    securityType2: z.string().nullable(),
    marketSector: z.string().nullable(),
    exchCode: z.string().nullable(),

    ticker: z.string().nullable(),
    name: z.string().nullable(),
    shareClassFIGI: z.string().nullable(),
    compositeFIGI: z.string().nullable(),
    securityDescription: z.string().nullable(),
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
}
export type SearchResponse = z.infer<typeof SearchResponseValidator>

export async function search(req: SearchRequest): Promise<SearchResponse> {
  const client = new Client()
  console.log({
    query: req.fragment,
    currency: req.currency,
  })
  const res = await client.post<SearchResponse>({
    path: "/v3/search",
    body: {
      query: req.fragment,
      currency: req.currency,
    },
  })
  console.log({ res })
  return SearchResponseValidator.parse(res.data)
}

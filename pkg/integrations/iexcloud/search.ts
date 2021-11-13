import * as z from "zod"
import { Client } from "./client"

export const SearchResponseValidator = z.array(
  z.object({
    symbol: z.string(),
    exchange: z.string(),
    exchangeSuffix: z.string().nullable(),
    exchangName: z.string().optional(),
    name: z.string(),
    iexId: z.string().nullable(),
    region: z.string(),
    currency: z.string(),
    figi: z.string().nullable(),
    cik: z.string().nullable(),
    lei: z.string().nullable(),
    securityName: z.string(),
    securityType: z.enum([
      "ad",
      "cs",
      "cef",
      "et",
      "oef",
      "ps",
      "rt",
      "struct",
      "ut",
      "wi",
      "wt",
      "",
    ]),
    sector: z.string().nullable(),
  }),
)

export type SearchResponse = z.infer<typeof SearchResponseValidator>

export async function search(fragment: string): Promise<SearchResponse> {
  const client = new Client()

  const res = await client.get({
    path: `/search/${fragment}`,
  })
  return SearchResponseValidator.parse(res)
}

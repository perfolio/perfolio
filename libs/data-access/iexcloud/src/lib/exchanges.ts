import * as z from "zod"
import { Client } from "./client"

export const GetExchangesResponseValidation = z.array(
  z.object({
    /**
     * Exchange abbreviation
     */
    exchange: z.string(),

    /**
     * 2 letter case insensitive string of country codes using ISO 3166-1 alpha-2
     */
    region: z.string(),

    /**
     * Full name of the exchange.
     */
    description: z.string(),

    /**
     * Market Identifier Code using ISO 10383
     */
    mic: z.string(),

    /**
     * Exchange Suffix to be added for symbols on that exchange
     */
    exchangeSuffix: z.string(),
  }),
)
export type GetExchangesResponse = z.infer<typeof GetExchangesResponseValidation>

export async function getExchanges(): Promise<GetExchangesResponse> {
  const client = new Client()

  const res = await client.get({
    path: "/ref-data/exchanges",
  })

  return GetExchangesResponseValidation.parse(res)
}

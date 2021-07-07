import * as z from "zod"
import { Client } from "./client"

export const getInternationalSymbolsResponseValidator = z.array(
  z.object({
    symbol: z.string(),
    exchange: z.string().nullable(),
    exchangeSuffix: z.string().nullable(),
    exchangeName: z.string().nullable(),
    name: z.string().nullable(),
    date: z.string().nullable(),
    type: z.string().nullable(),
    iexId: z.string().nullable(),
    region: z.string().nullable(),
    currency: z.string(),
    isEnabled: z.boolean(),
    figi: z.string().nullable(),
    cik: z.string().nullable(),
    lei: z.string().nullable(),
  }),
)

/**
 * Resonse from the `GET /ref-data/symbols` endpoint.
 */
export type GetInternationalSymbolsResponse = z.infer<
  typeof getInternationalSymbolsResponseValidator
>

export async function getInternationalSymbols(): Promise<GetInternationalSymbolsResponse> {
  const client = new Client()

  const res = await client.get({
    path: "/ref-data/symbols",
  })
  return getInternationalSymbolsResponseValidator.parse(res)
}

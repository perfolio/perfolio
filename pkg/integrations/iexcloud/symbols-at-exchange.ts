import * as z from "zod"
import { Client } from "./client"

export const getSymbolsAtExchangeRequestValidation = z.array(
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
 * Resonse from the `GET /ref-data/exchange/<exchange>/symbols` endpoint.
 */
export type GetSymbolsAtExchangeResponse = z.infer<typeof getSymbolsAtExchangeRequestValidation>
/**
 * @param exchange - The iex internal identifier. not MIC
 */
export async function getSymbolsAtExchange(
  exchange: string,
): Promise<GetSymbolsAtExchangeResponse> {
  const client = new Client()

  const res = await client.get({
    path: `/ref-data/exchange/${exchange}/symbols`,
  })
  return getSymbolsAtExchangeRequestValidation.parse(res)
}

import * as z from "zod"
import { Client, } from "./client"

export const GetFigiMappingResponseValidator = z.array(
  z.object({
    symbol: z.string(),
    region: z.string(),
    exchange: z.string(),
  },),
)
export type GetFigiMappingResponse = z.infer<typeof GetFigiMappingResponseValidator>

/**
 * Return the figi mapping for all figis where iex knows a matching symbol.
 *
 * The result is always an array, even if you only specify one figi
 */
export async function getFigiMapping(...figi: string[]): Promise<GetFigiMappingResponse> {
  if (figi.length === 0) {
    return []
  }
  const res = await new Client().get({
    path: `/ref-data/figi`,
    parameters: { figi, },
  },)

  return GetFigiMappingResponseValidator.parse(res,)
}

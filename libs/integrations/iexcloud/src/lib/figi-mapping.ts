import * as z from "zod"
import { Client } from "./client"

export const GetFigiMappingResponseValidator = z.array(
  z.object({
    symbol: z.string(),
    region: z.string(),
    exchange: z.string(),
  }),
)
export type GetFigiMappingResponse = z.infer<typeof GetFigiMappingResponseValidator>

export async function getFigiMapping(figi: string): Promise<GetFigiMappingResponse> {
  const res = await new Client().get({
    path: `/ref-data/figi`,
    parameters: { figi },
  })

  return GetFigiMappingResponseValidator.parse(res)
}

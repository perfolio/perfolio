import * as z from "zod"
import { Client } from "./client"

export const GetIsinMappingResponseValidator = z.array(
  z.object({
    /**
     * The ticker
     */
    symbol: z.string(),

    /**
     * An identifier of where the asset is listed
     */
    exchange: z.string(),

    /**
     * The geographic identifier where the asset is listed
     */
    region: z.string(),
  }),
)

/**
 * Resonse from the `GET /stock/{asset}/company` endpoint.
 */
export type GetIsinMappingResponse = z.infer<typeof GetIsinMappingResponseValidator>

export async function getIsinMapping(isin: string): Promise<GetIsinMappingResponse> {
  const client = new Client()
  const res = await client
    .get({
      path: `/ref-data/isin`,
      parameters: {
        isin,
      },
    })
    .catch((err) => {
      throw new Error(`Unable to load ref-data for isin: "${isin}": ${err}`)
    })
  const validatedResponse = GetIsinMappingResponseValidator.parse(res)
  return validatedResponse.map((res) => {
    return {
      exchange: res.exchange,
      region: res.region,
      symbol: res.symbol,
    }
  })
}

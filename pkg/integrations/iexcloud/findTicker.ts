import * as z from "zod"
import { Client } from "./client"

export type FindTickerRequest = {
  isin: string
}

export const findTickerValidation = z.array(
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
export type FindTickerResponse = z.infer<typeof findTickerValidation>

export async function findTicker(
  client: Client,
  req: FindTickerRequest,
): Promise<FindTickerResponse> {
  const res = await client
    .get({
      path: `/ref-data/isin`,
      parameters: {
        isin: req.isin,
      },
    })
    .catch((err) => {
      throw new Error(`Unable to load ref-data for isin: "${req.isin}": ${err}`)
    })
  return findTickerValidation.parse(res)
}

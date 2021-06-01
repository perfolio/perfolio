import * as z from "zod"
import { Client } from "./client"

export const GetVolumeByVendorResponseValidator = z.array(
  z.object({
    /**
     * Refers to the current day, 15 minute delayed volume
     */
    volume: z.number(),

    /**
     * Refers to the Market Identifier Code (MIC)
     */
    venue: z.string(),

    /**
     * Refers to a readable version of the venue defined by IEX
     */
    venueName: z.string(),

    /**
     * Refers to the date the data was last updated in the format YYYY-MM-DD
     */
    date: z.string().nullable(),

    /**
     * Refers to the 15 minute delayed percent of total stock volume traded by the venue
     */
    marketPercent: z.number(),
  }),
)

/**
 * Resonse from the `GET /stock/{symbol}/company` endpoint.
 */
export type GetVolumeByVenue = z.infer<
  typeof GetVolumeByVendorResponseValidator
>

export async function getVolumeByVenue(
  symbol: string,
): Promise<GetVolumeByVenue> {
  const res = await new Client().get({
    path: `/stock/${symbol}/volume-by-venue`,
  })
  return GetVolumeByVendorResponseValidator.parse(res)
}

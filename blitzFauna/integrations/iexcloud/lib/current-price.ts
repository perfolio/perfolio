import * as z from "zod"
import { Client } from "./client"

export const GetCurrentPriceResponseValidator = z.number()
export type GetCurrentPriceResponse = z.infer<
  typeof GetCurrentPriceResponseValidator
>

export async function getCurrentPrice(
  symbol: string,
): Promise<GetCurrentPriceResponse> {
  symbol = symbol.toLowerCase()

  const res = await new Client().get({
    path: `/stock/${symbol}/price`,
  })

  return GetCurrentPriceResponseValidator.parse(res)
}

import { Time } from "@perfolio/util/time"
import * as z from "zod"
import { Client } from "./client"
import { HTTPError } from "@perfolio/util/errors"
export const GetPriceResponseValidator = z.array(
  z
    .object({
      /**
       * Fully adjusted for historical dates.
       */
      fClose: z.number(),
    })
    .nonstrict(),
)

/**
 * Load the closing price for a specific date.
 */
export type GetPriceResponse = { close: number }

export async function getPrice(symbol: string, time: Time): Promise<GetPriceResponse> {
  const { year, month, day } = time.pad()

  const res = await new Client()
    .get({
      path: `/stock/${symbol}/chart/date/${year}${month}${day}`,
      parameters: {
        chartByDay: "true",
        chartCloseOnly: "true",
      },
    })
    .catch((err) => {
      /**
       * Just return -1 if the request was in the past where no price data was availabe.
       */
      if (err instanceof HTTPError && time.unix() <= Time.today().unix()) {
        return {
          close: -1,
        }
      } else {
        throw err
      }
    })
  const validated = GetPriceResponseValidator.parse(res)
  return { close: validated[0].fClose ?? -1 }
}

export const GetHistoryResponseValidator = z.array(
  z
    .object({
      /**
       * Date of the closing price.
       */
      date: z.string(),
      /**
       * Actual closing price.
       */
      close: z.number(),
    })
    .nonstrict(),
)

export type GetHistoryResponse = z.infer<typeof GetHistoryResponseValidator>

export async function getHistory(symbol: string): Promise<GetHistoryResponse> {
  const res = await new Client().get({
    path: `/stock/${symbol}/chart/max`,
    parameters: {
      chartCloseOnly: "true",
    },
  })

  return GetHistoryResponseValidator.parse(res)
}

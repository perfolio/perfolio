import * as z from "zod"
import { Client } from "./client"
export type GetHistoryRequest = {
  ticker: string
}

const GetHistoryResponseValidator = z.array(
  z.object({
    /**
     * Date of the closing price.
     */
    date: z.string(),
    /**
     * Actual closing price.
     */
    close: z.number(),
  }),
)

export type GetHistoryResponse = z.infer<typeof GetHistoryResponseValidator>

export async function getHistory(
  client: Client,
  req: GetHistoryRequest,
): Promise<GetHistoryResponse> {
  const res = await client.get({
    path: `/stock/${req.ticker}/chart/max`,
    parameters: {
      chartCloseOnly: "true",
    },
  })

  return GetHistoryResponseValidator.parse(res)
}

import * as z from "zod"
import { Client } from "./client"


export type GetLogoRequest = {
  ticker: string
}

export const GetLogoResponseValidator = z.object({
  /**
   * Url of the logo
   */
  url: z.string().url(),
})

export type GetLogoResponse = z.infer<typeof GetLogoResponseValidator>

export async function getLogo(client:Client, req: GetLogoRequest): Promise<GetLogoResponse> {
  let res = (await client
    .get({
      path: `/stock/${req.ticker}/logo`,
    })
    .catch((err) => {
      client.logger.warn(err)
    })) as { url: string }
  if (!res?.url) {
    res = {
      url:
        "https://avatars.githubusercontent.com/u/67603535?s=400&u=cb14061ee696c1d3ca79760fcc80dd00ad93d8d3&v=4",
    }
  }
  return GetLogoResponseValidator.parse(res)
}

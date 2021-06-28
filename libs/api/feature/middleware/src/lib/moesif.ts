import { MiddlewareContext, ApiHandler } from "./types"
// eslint-disable-next-line
// @ts-ignore
import moesif from "moesif-nodejs"
import { NextApiRequest } from "next"
import { JWT } from "@perfolio/feature/tokens"

const getUserId = (req: NextApiRequest): string | undefined => {
  const jwt = req.headers.authorization

  if (!jwt) {
    return undefined
  }

  return JWT.decode(jwt).sub
}
/**
 *Send metrics to moesif
 */
export function withMetrics(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    try {
      const config = {
        applicationId: process.env.NX_MOESIF_ID,
        identifyUser: () => getUserId(ctx.req),
        getMetadata: () => {
          return {
            NODE_ENV: process.env.NODE_ENV,
          }
        },
      }
      const mw = moesif(config)

      await mw(ctx.req, ctx.res)
    } catch (err) {
      console.log(err)
    }

    return handler(ctx)
  }
}

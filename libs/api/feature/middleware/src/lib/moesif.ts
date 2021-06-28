import { MiddlewareContext, ApiHandler } from "./types"
// eslint-disable-next-line
// @ts-ignore
import moesif from "moesif-nodejs"

// const runMiddleware = (req: NextApiRequest, res: NextApiResponse, next: any) => {
//   return new Promise((resolve, reject) => {
//     next(req, res, (result: unknown) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }
//       console.log({ result })
//       return resolve(result)
//     })
//   })
// }

/**
 *Send metrics to moesif
 */
export function withMetrics(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    try {
      const config = {
        applicationId: process.env.NX_MOESIF_ID,
        identifyUser: () => ctx.claims?.userId,
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

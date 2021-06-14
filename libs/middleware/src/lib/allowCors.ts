import { MiddlewareContext, ApiHandler } from "./types"
import Cors from "cors"

const cors = Cors({ methods: ["POST", "HEAD", "OPTIONS"] })

/**
 * If an OPTIONS request comes in we simply return 200
 */
export function allowCors(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    try {
      cors(ctx.req, ctx.res, (err) => {
        if (err instanceof Error) {
          throw err
        }
      })
    } catch (err) {
      ctx.res.status(400)
      return ctx.res.end(err.message)
    }

    // ctx.res.setHeader("Access-Control-Allow-Credentials", "true")
    // ctx.res.setHeader("Access-Control-Allow-Origin", "*")
    // // another common pattern
    // // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // ctx.res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST")
    // ctx.res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    // )
    if (ctx.req.method === "OPTIONS") {
      return ctx.res.status(200).end()
    }

    return handler(ctx)
  }
}

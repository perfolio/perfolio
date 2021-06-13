import { MiddlewareContext, ApiHandler } from "./types"

/**
 * If an OPTIONS request comes in we simply return 200
 */
export function allowCors(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    console.log("enabling cors")
    ctx.res.setHeader("Access-Control-Allow-Credentials", "true")
    ctx.res.setHeader("Access-Control-Allow-Origin", "*")
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    ctx.res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
    ctx.res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    )
    console.log("done")
    if (ctx.req.method === "OPTIONS") {
      console.log("PREFLIGHT CHECK DETECTED")
      return ctx.res.status(200).end()
    }

    return handler(ctx)
  }
}

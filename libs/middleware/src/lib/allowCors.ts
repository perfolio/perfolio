import { MiddlewareContext, ApiHandler } from "./types"

/**
 * If an OPTIONS request comes in we simply return 200
 */
export function allowCors(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    ctx.res.setHeader("Access-Control-Allow-Credentials", "true")
    ctx.res.setHeader("Access-Control-Allow-Origin", "*")
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    ctx.res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST")
    ctx.res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    )
    if (ctx.req.method === "OPTIONS") {
      return ctx.res.status(200).end()
    }

    return handler(ctx)
  }
}

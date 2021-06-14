import { MiddlewareContext, ApiHandler } from "./types"

/**
 * If an OPTIONS request comes in we simply return 200
 */
export function allowCors(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    console.log("Applying cors middleware")

    ctx.res.setHeader("Access-Control-Allow-Credentials", "true")
    if (ctx.req.headers.origin) {
      ctx.res.setHeader("Access-Control-Allow-Origin", ctx.req.headers.origin)
      console.log(
        `Setting Access-Control-Allow-Origin=${ctx.res.getHeader("Access-Control-Allow-Origin")}`,
      )
    }
    ctx.res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,DELETE,OPTIONS,POST")
    ctx.res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    )
    if (ctx.req.method === "OPTIONS") {
      console.log("detected OPTIONS, returning 200")
      return ctx.res.status(200).end()
    }

    return handler(ctx)
  }
}

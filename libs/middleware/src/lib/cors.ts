import { MiddlewareContext, ApiHandler, Middleware } from "./types"

/**
 * Sets headers to allow CORS requests from a specific domain or all domains.
 *
 * Make sure this is the first middleware in your stack
 */
export function withCors(allowedOrigin = "*"): Middleware {
  return (handler: ApiHandler): ApiHandler => {
    return async (ctx: MiddlewareContext): Promise<void> => {
      console.log("Method:", ctx.req.method)
      ctx.res.setHeader("Access-Control-Allow-Credentials", "true")
      ctx.res.setHeader("Access-Control-Allow-Origin", allowedOrigin)
      ctx.res.setHeader("Access-Control-Allow-Methods", "POST")
      ctx.res.setHeader(
        "Access-Control-Allow-Headers",
        [
          "Authorization",
          "X-CSRF-Token",
          "X-Requested-With",
          "Accept",
          "Accept-Version",
          "Content-Length",
          "Content-MD5",
          "Content-Type",
          "Date",
          "X-Api-Version",
        ].join(", "),
      )
      /**
       * Handle preflight OPTIONS requests
       */
      if (ctx.req.method === "OPTIONS") {
        console.log("detected OPTIONS, returning 200")

        return ctx.res.status(200).end()
      } else {
        return handler(ctx)
      }
    }
  }
}

import { MiddlewareContext, ApiHandler, Middleware } from "./types"

/**
 * Sets headers to allow CORS requests from a specific domain or all domains.
 *
 * Make sure this is the first middleware in your stack
 */
export function withCors(allowedOrigin?: string): Middleware {
  return (handler: ApiHandler): ApiHandler => {
    return async (ctx: MiddlewareContext): Promise<void> => {
      console.log("Method:", ctx.req.method)
      /**
       * A CORS preflight request is a CORS request that checks to see if the
       * CORS protocol is understood and a server is aware using specific
       * methods and headers.
       *
       * It is an OPTIONS request, using three HTTP request headers:
       * Access-Control-Request-Method, Access-Control-Request-Headers,
       * and the Origin header.
       *
       * @see https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
       */
      if (ctx.req.method === "OPTIONS") {
        ctx.res.setHeader("Access-Control-Allow-Credentials", "true")
        ctx.res.setHeader(
          "Access-Control-Allow-Origin",
          allowedOrigin ?? ctx.req.headers.origin ?? "*",
        )
        ctx.res.setHeader("Access-Control-Allow-Methods", "POST")
        ctx.res.setHeader("Access-Control-Max-Age", 24 * 60 * 60) // 24h
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
        return ctx.res.status(204).end()
      } else {
        return handler(ctx)
      }
    }
  }
}

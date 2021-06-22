import { MiddlewareContext, ApiHandler } from "./types"
import { JWT } from "@perfolio/feature/tokens"
export function withAuthentication(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    if (ctx.req.method === "OPTIONS") {
      return ctx.res.status(204).end()
    }
    console.log(Date.now(), "authenticationMiddleware", { method: ctx.req.method })

    const jwt = ctx.req.headers.authorization

    if (!jwt) {
      ctx.res.status(401)
      ctx.res.end("Not authorized: Authorization header missing")
      return
    }

    /**
     * Validate token
     */
    try {
      ctx.claims = JWT.verify(jwt)
      return handler(ctx)
    } catch (err) {
      ctx.res.status(401)
      return ctx.res.end(`Unauthorized: ${err}`)
    }
  }
}

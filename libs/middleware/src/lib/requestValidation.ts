import { z } from "zod"
import { MiddlewareContext, ApiHandler, Middleware } from "./types"

export function withRequestValidation(validator: z.ZodAny): Middleware {
  return (handler: ApiHandler): ApiHandler => {
    return async (ctx: MiddlewareContext): Promise<void> => {
      console.log("requestValidationMiddleware", { method: ctx.req.method })

      try {
        validator.parse(ctx.req.body)
        return handler(ctx)
      } catch (err) {
        ctx.res.status(400)
        return ctx.res.end(`Invalid request arguments: ${err}`)
      }
    }
  }
}

import { z } from "zod"
import { MiddlewareContext, ApiHandler, Middleware } from "./types"

export function withRequestValidation(validator: z.AnyZodObject): Middleware {
  return (handler: ApiHandler): ApiHandler => {
    return async (ctx: MiddlewareContext): Promise<void> => {
      if (ctx.req.method === "OPTIONS") {
        return ctx.res.status(204).end()
      }

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

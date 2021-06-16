import { MiddlewareContext, ApiHandler } from "./types"

/**
 * If content-type is not application/json the request body would be a string.
 * This way we do not have to unmarshal it ourselves because next has already done it.
 */
export function withContentTypeJson(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    if (ctx.req.headers["content-type"] !== "application/json") {
      ctx.res.status(400)
      return ctx.res.end("Content type must be application/json")
    }

    return handler(ctx)
  }
}

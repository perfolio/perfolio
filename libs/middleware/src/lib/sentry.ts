import { withSentry as withSentryWrapper } from "@sentry/nextjs"

import { MiddlewareContext, ApiHandler } from "./types"

export function withSentry(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    if (process.env.NODE_ENV === "production") {
      return withSentryWrapper((req, res) => handler({ ...ctx, req, res }))(ctx.req, ctx.res)
    }
    return handler(ctx)
  }
}

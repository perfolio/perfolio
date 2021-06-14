import { signin } from "@perfolio/lambda"

import { use, MiddlewareContext, ApiHandler } from "@perfolio/middleware"
function handleOptions(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    console.log("Method:", ctx.req.method)
    if (ctx.req.method === "OPTIONS") {
      console.log("detected OPTIONS, returning 200")
      return ctx.res.status(200).end()
    } else {
      return handler(ctx)
    }
  }
}

export default use(signin, [handleOptions])

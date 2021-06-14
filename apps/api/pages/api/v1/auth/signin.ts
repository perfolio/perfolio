import { signin } from "@perfolio/lambda"

import { use, MiddlewareContext, ApiHandler } from "@perfolio/middleware"
function handleOptions(handler: ApiHandler): ApiHandler {
  return async (ctx: MiddlewareContext): Promise<void> => {
    console.log("Method:", ctx.req.method)
    if (ctx.req.method === "OPTIONS") {
      console.log("detected OPTIONS, returning 200")
      ctx.res.setHeader("Access-Control-Allow-Credentials", "true")
      ctx.res.setHeader("Access-Control-Allow-Origin", "*")
      ctx.res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
      ctx.res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      )

      return ctx.res.status(200).end()
    } else {
      return handler(ctx)
    }
  }
}

export default use(signin, [handleOptions])

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { MiddlewareContext, ApiHandler, Middleware } from "./types"
import { Claims } from "@perfolio/tokens"
/**
 * Expose the context to a handler function and transform it to implement `ApiHandler`
 */
export function castToApiHandler<REQ, RES>(
  fn: (req: REQ, ctx: MiddlewareContext) => Promise<RES>,
): ApiHandler {
  return async (ctx: MiddlewareContext) => {
    try {
      const fnRes = await fn(ctx.req.body as REQ, ctx)
      ctx.res.json(fnRes ?? ({} as RES))
      ctx.res.end()
    } catch (err) {
      console.error(err)
      ctx.res.status(500)
      ctx.res.end(err.message)
    }
  }
}

/**
 * Wrap all middlewares around the handler
 *
 * A ctx object is used to pass metadat between middlewares.
 * Currently this is only used to pass the user's claims from their jwt to the final
 * handler.
 *
 * @example
 * ```typescript
 * export default use(subscribe, [
 *   withContentTypeJson,
 *   withRequestValidation(SubscribeRequestValidation),
 * ])
 * ```
 *
 * @param fn - The actual api handler which takes in a request and returns a response.
 * This function has access to the ctx where all middlewars can write and read to.
 */
export function use<REQ, RES>(
  fn: (req: REQ, ctx: MiddlewareContext) => Promise<RES>,
  mws: Middleware[],
): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log("begin")

    let handler = castToApiHandler(fn)

    mws.reverse().forEach((mw) => {
      handler = mw(handler)
    })

    return handler({ req, res, claims: {} as Claims })
  }
}

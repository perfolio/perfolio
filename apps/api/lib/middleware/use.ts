import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { MiddlewareContext, ApiHandler, Middleware } from "./types"
import { Claims } from "@perfolio/auth"
/**
 * Expose the context to a handler function and transform it to implement `ApiHandler`
 */
function castToApiHandler<REQ, RES>(
  fn: (req: REQ, ctx: MiddlewareContext) => Promise<RES>,
): ApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse, ctx: MiddlewareContext) => {
    try {
      const fnRes = await fn(req.body as REQ, ctx)
      res.json(fnRes ?? ({} as RES))
      res.end()
    } catch (err) {
      console.error(err)
      res.status(500)
      res.end(err.message)
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
 *   withPreflightChecks,
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
    let handler = castToApiHandler(fn)
    for (const mw of mws.reverse()) {
      handler = mw(handler)
    }
    return handler(req, res, { req, res, claims: {} as Claims })
  }
}

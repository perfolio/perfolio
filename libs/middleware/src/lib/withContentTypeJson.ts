import { NextApiRequest, NextApiResponse } from "next"
import { MiddlewareContext, ApiHandler } from "./types"

/**
 * If content-type is not application/json the request body would be a string.
 * This way we do not have to unmarshal it ourselves because next has already done it.
 */
export function withContentTypeJson(handler: ApiHandler): ApiHandler {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    ctx: MiddlewareContext,
  ): Promise<void> => {
    if (
      /**
       * OPTIONS requests will be fired during preflight and will not have
       * content-type set
       */
      req.method?.toLowerCase() === "post" &&
      req.headers["content-type"] !== "application/json"
    ) {
      res.status(400)
      res.end("Content type must be application/json")
      return
    }

    return handler(req, res, ctx)
  }
}

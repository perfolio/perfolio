import { Claims } from "@perfolio/auth"
import { NextApiRequest, NextApiResponse } from "next"
export type MiddlewareContext = {
  claims?: Claims
}

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: MiddlewareContext,
) => Promise<void>

export type Middleware = (apiHandler: ApiHandler) => ApiHandler

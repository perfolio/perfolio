import { Claims } from "@perfolio/tokens"
import { NextApiRequest, NextApiResponse } from "next"
export type MiddlewareContext = {
  claims: Claims
  req: NextApiRequest
  res: NextApiResponse
}

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: MiddlewareContext,
) => Promise<void>

export type Middleware = (apiHandler: ApiHandler) => ApiHandler

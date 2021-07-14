import { DataSources } from "./datasources"
import { IncomingMessage } from "http"
import { AuthenticationError } from "@perfolio/util/errors"
import { Claims, JWT } from "@perfolio/feature/tokens"
import { Logger } from "tslog"

export type Context = {
  dataSources: DataSources
  authenticateUser: () => Claims
  logger: Logger
}

export const context = (ctx: { req: IncomingMessage }) => {
  const logger = new Logger()
  const authenticateUser = () => {
    try {
      const jwt = ctx.req.headers?.authorization
      if (!jwt) {
        throw new AuthenticationError("missing authorization header")
      }
      return JWT.verify(jwt)
    } catch (err) {
      throw new AuthenticationError("invalid token")
    }
  }

  return {
    ...ctx,
    authenticateUser,
    logger,
  }
}

import { DataSources } from "./datasources"
import { IncomingMessage } from "http"
import { AuthenticationError } from "@perfolio/util/errors"
import { Claims, JWT } from "@perfolio/feature/tokens"
import { Logger } from "tslog"
import { PrismaClient } from "@prisma/client"

export type Context = {
  dataSources: DataSources
  authenticateUser: () => Promise<Claims>
  logger: Logger
  prisma: PrismaClient
}

export const context = (ctx: { req: IncomingMessage }) => {
  const logger = new Logger()
  const authenticateUser = async () => {
    try {
      const token = ctx.req.headers?.authorization
      if (!token) {
        throw new AuthenticationError("missing authorization header")
      }
      const jwt = JWT.getInstance()

      return await jwt.verify(token)
    } catch (err) {
      logger.error(err)
      throw new AuthenticationError("invalid token")
    }
  }

  return {
    ...ctx,
    authenticateUser,
    logger,
    prisma: new PrismaClient({}),
  }
}

import { DataSources } from "./datasources"
import { IncomingMessage } from "http"
import { AuthenticationError, AuthorizationError } from "@perfolio/util/errors"
import { JWT } from "@perfolio/feature/tokens"
import { Logger } from "tslog"
import { PrismaClient } from "@prisma/client"
import { env } from "@perfolio/util/env"

type UserType = { userId: string; root: boolean }

export type Context = {
  dataSources: DataSources
  authenticateUser: () => Promise<UserType>
  authorizeUser: (authorizer: (userId: string) => boolean) => Promise<void>
  logger: Logger
  prisma: PrismaClient
}

export const context = (ctx: { req: IncomingMessage }) => {
  const logger = new Logger()
  const authenticateUser = async (): Promise<UserType> => {
    const token = ctx.req.headers?.authorization
    if (!token) {
      throw new AuthenticationError("missing authorization header")
    }
    if (token.startsWith("Bearer ")) {
      const jwt = JWT.getInstance()

      const claims = await jwt.verify(token.replace("Bearer ", "")).catch((err) => {
        logger.error(err)
        throw new AuthenticationError("Unable to verify token")
      })
      return { userId: claims.sub, root: false }
    }
    if (
      new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(
        token,
      )
    ) {
      if (token === env.require("ROOT_TOKEN")) {
        return { userId: token, root: true }
      }
    }
    throw new AuthenticationError("Invalid token")
  }

  const authorizeUser = async (authorizer: (userId: string) => Promise<void>): Promise<void> => {
    const { userId, root } = await authenticateUser()
    if (root) {
      return
    }
    if (!authorizer(userId)) {
      throw new AuthorizationError("UserId does not match")
    }
  }

  return {
    ...ctx,
    authenticateUser,
    authorizeUser,
    logger,
    prisma: new PrismaClient({}),
  }
}

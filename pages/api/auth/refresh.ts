import { NextApiHandler } from "next"
import { PrismaClient } from "pkg/integrations/prisma"
import { JWT } from "pkg/auth"
import { Logger } from "pkg/logger"
import { HttpError } from "pkg/util/errors"
import { Magic } from "@magic-sdk/admin"
import { env } from "@chronark/env"
import { MagicAdminSDKError } from "@magic-sdk/admin/dist/core/sdk-exceptions"
import { Role } from "@perfolio/pkg/auth/roles"
/**
 * Retrieve the session id from cookies and create a new session and access token
 */

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Allow", "POST")
    return res.end()
  }

  const logger = new Logger({ name: "api/auth/refresh" })

  try {
    const prisma = new PrismaClient()
    const didToken = req.headers.authorization
    if (!didToken) {
      throw new HttpError(401, "No token sent with cookies")
    }
    const magic = new Magic(env.require("MAGIC_SECRET_KEY"))
    magic.token.validate(didToken)

    const [, { iss: magicId }] = magic.token.decode(didToken)

    const user = await prisma.user.findUnique({
      where: { magicId },
      include: { roles: true },
    })
    if (!user) {
      throw new HttpError(500, `No user found with magicId: ${magicId}`)
    }

    const accessToken = JWT.sign(user.id, { roles: user.roles.map((r) => r.name as Role) })

    res.json({ accessToken })
  } catch (err) {
    if (err instanceof HttpError && err.status === 401) {
      res.send(err)
    } else if (err instanceof MagicAdminSDKError && err.code === "ERROR_DIDT_EXPIRED") {
      res.redirect("/auth/signin")
    } else {
      logger.error("Fatal error", { err: err as Error })
      res.send(err)
    }

    res.status(err instanceof HttpError ? err.status : 500)
  } finally {
    res.end()
  }
}

export default handler

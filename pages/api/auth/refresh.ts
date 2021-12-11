import { NextApiHandler } from "next"
import { PrismaClient } from "pkg/integrations/prisma"
import { JWT, AuthCookie } from "pkg/auth"
import { Logger } from "pkg/logger"
import { HttpError } from "pkg/util/errors"
import { Magic } from "@magic-sdk/admin"
import { env } from "@chronark/env"
import { MagicAdminSDKError } from "@magic-sdk/admin/dist/core/sdk-exceptions"
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
    const cookie = new AuthCookie(req, res)
    const didToken = await cookie.getToken()
    if (!didToken) {
      throw new HttpError(401, "No token sent with cookies")
    }
    const magic = new Magic(env.require("MAGIC_SECRET_KEY"))
    magic.token.validate(didToken)
    const [, claims] = magic.token.decode(didToken)

    console.log({claims})
    const user = await prisma.user.findUnique({
      where: { id: claims.sub },
      include: { roles: { include: { permissions: true } } },
    })
    if (!user) {
      throw new HttpError(500, `No user found`)
    }

    const permissions: string[] = user.roles.flatMap((role) => role.permissions.map((p) => p.name))

    const accessToken = JWT.sign(user.id, { permissions })

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

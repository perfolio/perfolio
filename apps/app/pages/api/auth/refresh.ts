import { NextApiHandler } from "next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { JWT, Auth, SessionCookie } from "@perfolio/auth"
import { Logger } from "@perfolio/logger"
import { HTTPError } from "@perfolio/util/errors"
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
  const prisma = new PrismaClient()
  const auth = new Auth(prisma)
  const cookie = new SessionCookie(req, res)
  try {
    const refreshToken = await cookie.getRefreshToken()
    if (!refreshToken) {
      throw new HTTPError(401, "No refresh token sent with cookies")
    }

    const user = await auth.getUserFromRefreshToken(refreshToken)
    if (!user) {
      throw new HTTPError(500, `No user found`)
    }

    /**
     * Create a new session token
     */
    const newRefreshToken = await auth.refreshAccessToken(refreshToken)
    await cookie.set(newRefreshToken).catch((err) => {
      throw new HTTPError(500, `Unable to set session cookie: ${err}`)
    })

    const accessToken = JWT.sign(user.id, "PRO")
    res.json({ accessToken })
  } catch (err) {
    logger.error("Fatal error", err)
    res.status(err instanceof HTTPError ? err.status : 500)
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler

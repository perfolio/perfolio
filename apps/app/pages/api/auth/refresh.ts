import { NextApiHandler } from "next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { JWT, Auth, SessionCookie } from "@perfolio/auth"
import { AuthenticationError } from "@perfolio/util/errors"
import {Logger} from "tslog"
/**
 * Retrieve the session id from cookies and create a new session and access token
 */

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405)
    res.setHeader("Allow", "GET")
    return res.end()
  }
  const logger = new Logger()
  const prisma = new PrismaClient()
  const auth = new Auth(prisma)
  const cookie = new SessionCookie(req, res)
  try {
    const sessionToken = await cookie.getSessionToken().catch((err) => {
      res.status(500)
      throw new Error(`Unable to get session cookie: ${err}`)
    })

    const user = await auth.getUserFromSessionToken(sessionToken)
    if (!user) {
      throw new Error(`No user found`)
    }

    /**
     * Create a new session token
     */
    const { newSessionToken} = await auth.refreshSessionToken(sessionToken)

    await cookie.set(newSessionToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to set session cookie: ${err}`)
    })

    const accessToken = JWT.sign(user.id, user.plan)
    logger.debug({accessToken})
    res.json({ accessToken })
  } catch (err) {
    logger.error(err)
    // cookie.remove()
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler

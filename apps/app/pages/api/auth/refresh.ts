import { NextApiHandler } from "next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { JWT, Auth } from "@perfolio/auth"
/**
 * Retrieve the session id from cookies and create a new session and access token
 */

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405)
    res.setHeader("Allow", "GET")
    return res.end()
  }
  const auth = new Auth(new PrismaClient())
  try {
    const { sessionToken } = await auth.getSessionCookie(req).catch((err) => {
      res.status(500)
      throw new Error(`Unable to get session cookie: ${err}`)
    })

    const user = await auth.getUserFromSessionToken(sessionToken)
    if (!user) {
      throw new Error(`No user found`)
    }

    const session = await auth.createSession(user.id).catch((err) => {
      res.status(500)
      throw new Error(`Unable to create session: ${err}`)
    })

    await auth.setSessionCookie(res, session.sessionToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to set session cookie: ${err}`)
    })

    const accessToken = JWT.sign(user.id, user.plan)

    res.json({ accessToken })
  } catch (err) {
    auth.removeSessionCookie(res)
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler

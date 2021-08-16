import { NextApiHandler } from "next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { JWT, setCookie, getCookie, unseal, seal, Auth } from "@perfolio/auth"
/**
 * Retrieve the session id from cookies and create a new session and access token
 */

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405)
    res.setHeader("Allow", "GET")
    return res.end()
  }
  try {
    const { sessionToken } = await unseal(getCookie(req)).catch((err) => {
      res.status(500)
      throw new Error(`Unable to unseal cookie: ${err}`)
    })

    const auth = new Auth(new PrismaClient())
    const user = await auth.getUserFromSessionToken(sessionToken)

    const session = await auth.createSession(user.id).catch((err) => {
      res.status(500)
      throw new Error(`Unable to create session: ${err}`)
    })
    // Create a new session and new tokens

    const sealed = await seal(session.sessionToken).catch((err) => {
      res.status(500)
      throw new Error(`Unable to seal cookie: ${err}`)
    })

    setCookie(res, sealed)

    const accessToken = JWT.sign(user.id, user.plan)

    res.json({ accessToken })
  } catch (err) {
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler

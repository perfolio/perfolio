import { NextApiHandler } from "next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { Auth } from "@perfolio/auth"
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
  auth.removeSessionCookie(res)
  res.redirect("/")
  res.end()
}

export default handler

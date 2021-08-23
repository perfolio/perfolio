import { NextApiHandler } from "next"
import { SessionCookie } from "@perfolio/auth"
/**
 * Retrieve the session id from cookies and create a new session and access token
 */

const handler: NextApiHandler = async (req, res) => {
 
  new SessionCookie(req, res).remove()
  res.redirect("/")
  res.end()
}

export default handler

import { sessions, Session } from "@clerk/clerk-sdk-node"
import { NextApiRequest, NextApiResponse } from "next"
import { JWT } from "@perfolio/feature/tokens"
import { Logger } from "tslog"
interface RequestWithSession extends NextApiRequest {
  session: Session
}

export default async function handler(
  req: RequestWithSession,
  res: NextApiResponse,
): Promise<void> {
  const logger = new Logger()
  const sessionId = req.body.sessionId
  if (!sessionId) {
    res.status(400)
    return res.end("No session found")
  }

  const sessionToken = req.cookies["__session"]
  if (!sessionToken) {
    res.status(400)
    return res.end("Require `__session` cookie")
  }

  let session: Session
  try {
    session = await sessions.verifySession(sessionId, sessionToken)
  } catch (err) {
    logger.error(err)
    res.status(401)
    return res.end(err.message)
  }
  const userId = session.userId
  if (!userId) {
    throw new Error("Session does not have a userId")
  }

  const accessToken = JWT.sign(userId)
  res.json({ accessToken })
}

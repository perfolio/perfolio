import { MiddlewareContext, use } from "@perfolio/api/feature/middleware"
import { JWT } from "@perfolio/feature/tokens"
import { db } from "@perfolio/integrations/fauna"
import { getSession } from "@perfolio/auth"
async function refresh(_: void, { req }: MiddlewareContext): Promise<{ accessToken: string }> {
  const session = await getSession(req)
  if (!session) {
    throw new Error(`No session found`)
  }
  if (!session.email) {
    throw new Error(`No email found in session`)
  }
  const user = await db().user.fromEmail(session.email)
  if (!user) {
    throw new Error(`No user found`)
  }

  const accessToken = JWT.sign({ userId: user.id })

  return { accessToken }
}

export default use(refresh, [])

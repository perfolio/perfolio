import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0"
import { JWT } from "@perfolio/feature/tokens"
import { PrismaClient } from "@perfolio/integrations/prisma"

export default withApiAuthRequired(async function getAccessToken(req, res) {
  const session = getSession(req, res)
  if (!session) {
    res.status(500)
    console.error("No session found")
    return res.end("No session found")
  }
  const userId = session.user["sub"] as string

  const user = await new PrismaClient().user.findUnique({ where: { id: userId } })
  if (!user) {
    res.status(500)
    console.error("No user found")
    return res.end("No user found")
  }

  // const hasPayed = user.payedUntil >= Date.now() / 1000

  // if (!hasPayed) {
  //   res.status(500)
  //   return res.end("Pay up")
  // }
  const accessToken = JWT.sign(user.id, user.plan)
  res.json({ accessToken })

  res.end()
})

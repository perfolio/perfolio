import {
  NextApiRequest,
  NextApiResponse,
} from ".pnpm/next@11.0.1_f31b35bdaa3b7c2fce82404f09d2dac4/node_modules/next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { env } from "@perfolio/util/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405)
    res.setHeader("Access-Control-Allow-Methods", "GET")
    return res.end()
  }

  if (
    !req.headers["authorization"] ||
    req.headers["authorization"] !== env.require("AUTH0_WEBHOOK_TOKEN")
  ) {
    res.status(401)
    return res.end("Unauthorized")
  }

  const { userId } = req.query
  if (!userId) {
    res.status(400)
    return res.end("Missing userId")
  }

  const user = await new PrismaClient().user.findUnique({ where: { id: userId as string } })
  if (!user) {
    res.status(400)
    return res.end("No user found")
  }
  res.json({ payedUntil: user.payedUntil })
  res.end()
}

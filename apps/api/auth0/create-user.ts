import {
  NextApiRequest,
  NextApiResponse,
} from ".pnpm/next@11.0.1_f31b35bdaa3b7c2fce82404f09d2dac4/node_modules/next"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { env } from "@perfolio/util/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405)
    res.setHeader("Access-Control-Allow-Methods", "POST")
    return res.end()
  }

  if (
    !req.headers["authorization"] ||
    req.headers["authorization"] !== env.require("AUTH0_WEBHOOK_TOKEN")
  ) {
    res.status(401)
    return res.end("Unauthorized")
  }

  const { userId, email } = req.body
  if (!userId) {
    res.status(400)
    return res.end("Missing userId")
  }
  if (!email) {
    res.status(400)
    return res.end("Missing email")
  }

  await new PrismaClient().user.upsert({
    where: { id: userId },
    create: {
      id: userId,
      email,
    },
    update: {
      id: userId,
      email,
    },
  })
  res.end()
}

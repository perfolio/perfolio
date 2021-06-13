import { NextApiHandler } from "next"

const handler: NextApiHandler = (_, res) => {
  res.json({ hello: "world" })
}

export default handler

import { NextApiHandler } from "next"

const handler: NextApiHandler = (req, res) => {
  res.json({ hello: "world" })
}

export default handler

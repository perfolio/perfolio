import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { db } from "@perfolio/db"
const signup = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { username, email, password } = z
    .object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
    })
    .parse(req.body)

  await db().user.create({ username, email, password, role: "USER" })
  res.json({})
  res.end()
}

export default signup

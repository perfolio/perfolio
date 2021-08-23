import { NextApiHandler } from "next"
import { z } from "zod"
import { Auth } from "@perfolio/auth"
import { send } from "@perfolio/integrations/sendgrid"
import { PrismaClient } from "@perfolio/integrations/prisma"
/**
 * Create a new verification request and send the token to the user's email
 */

const validation = z.object({
  email: z.string().email(),
})

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405)
      res.setHeader("Allow", "POST")
      return res.end()
    }

    const auth = new Auth(new PrismaClient())

    const { email } = await validation.parseAsync(req.body).catch((err) => {
      res.status(400)
      throw err
    })
    const { otp } = await auth.createAuthenticationRequest(email).catch((err) => {
      res.status(500)
      throw new Error(`Unable to create session in database: ${err}`)
    })

    // send email
    await send(email, "Your OTP", otp).catch((err) => {
      res.status(500)
      throw err
    })

    res.json({ status: "OK" })
  } catch (err) {
    return res.send(err)
  } finally {
    res.end()
  }
}

export default handler

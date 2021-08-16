import { NextApiHandler } from "next"
import { z } from "zod"
import crypto from "crypto"
import { PrismaClient } from "@perfolio/integrations/prisma"
import { Time } from "@perfolio/util/time"
import { randomInt } from "crypto"
import { send } from "@perfolio/integrations/sendgrid"
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

    const { email } = await validation.parseAsync(req.body).catch((err) => {
      res.status(400)
      throw err
    })
    const otp = randomInt(0, 999999).toString().padStart(6, "0")

    const prisma = new PrismaClient()
    await prisma.verificationRequest
      .create({
        data: {
          identifier: email,
          token: crypto.createHash("sha256").update(otp).digest("hex"),
          expires: new Date(Date.now() + Time.toSeconds("10m", { ms: true })),
        },
      })
      .catch((err) => {
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

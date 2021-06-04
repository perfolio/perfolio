import { resolver } from "blitz"
import { Signin } from "app/auth/validations"
import { fauna } from "db"

export default resolver.pipe(
  resolver.zod(Signin),
  async ({ email, password }, ctx) => {
    const user = await fauna.user.signin({ email, password })
    await ctx.session.$create({ userId: user.id, role: "USER" })
    return user
  },
)

import { resolver } from "blitz"
import { Signin } from "app/auth/validations"
import { db } from "db"

export default resolver.pipe(
  resolver.zod(Signin),
  async ({ email, password }, ctx) => {
    const user = await db.user.signin({ email, password })
    console.error(user, ctx)
    await ctx.session.$create({ userId: user.id, role: "USER" })
    return user
  },
)

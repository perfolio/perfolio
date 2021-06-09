import { resolver } from "blitz"
import { Signup } from "app/auth/validations"
import { db } from "db"
export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, name, password }, ctx) => {
    const user = await db.user.create({
      email,
      name,
      password,
      role: "USER",
    })
    await ctx.session.$create({ userId: user.id, role: "USER" })
    return user
  },
)

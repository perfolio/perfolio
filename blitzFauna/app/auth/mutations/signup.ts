import { resolver } from "blitz"
import { Signup } from "app/auth/validations"
import { UserDocument } from "db"
export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const token = process.env.FAUNA_SERVER_KEY!
  const user = await UserDocument.create({ email, name: "name", password, role: "USER" }, token)
  await ctx.session.$create({ userId: user.id(), role: user.data.role })
  return user
})

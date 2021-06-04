import { resolver } from "blitz"
import { Signin } from "app/auth/validations"
import { UserDocument } from "db"

export default resolver.pipe(resolver.zod(Signin), async ({ email, password }, ctx) => {
  const token = process.env.FAUNA_SERVER_KEY!
  const user = await UserDocument.signin({ email, password }, token)
  await ctx.session.$create({ userId: user.id(), role: user.data.role })
  return user
})

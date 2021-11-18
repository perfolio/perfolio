import { ResolverFn, } from "@perfolio/pkg/api"
import { Context, } from "../../context"

export const subscribeToNewsletter: ResolverFn<string, unknown, Context, { email: string }> =
  async (
    _parent,
    { email, },
    ctx,
    _info,
  ) => {
    ctx.logger.info("Newsletter2222", { email, },)
    try {
      const res = await ctx.prisma.newsletter.upsert({
        where: {
          email,
        },
        update: {},
        create: {
          email,
        },
      },)
      ctx.logger.info("Resposne", { res, },)
    } catch (err) {
      ctx.logger.error("Error", { err, },)
    }

    return email
  }

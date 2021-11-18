import { Settings, } from "@perfolio/pkg/api"
import { Context, } from "../../context"

export const getSettingsFromUser = async (
  ctx: Context,
  userId: string,
): Promise<Omit<Settings, "defaultExchange">> => {
  await ctx.authorizeUser(({ sub, },) => sub === userId)

  const settings = await ctx.dataSources.prisma.settings.findUnique({
    where: { userId, },
  },)
  if (!settings) {
    throw new Error(`No user found: ${userId}`,)
  }
  return settings
}

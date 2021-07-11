import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { db, Settings } from "@perfolio/integrations/fauna"
import { z } from "zod"

export type GetSettingsResponse = z.infer<typeof Settings.schema> | null

export async function getSettings(_: void, ctx: MiddlewareContext): Promise<GetSettingsResponse> {
  const settings = await db().settings.fromUserId(ctx.claims.sub)
  if (!settings) {
    return null
  }
  return settings.data
}

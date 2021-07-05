import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { db, Settings } from "@perfolio/integrations/fauna"
import { z } from "zod"

export const UdpdateSettingsRequestValidation = Settings.updateValidation
export type UpdateSettingsRequest = z.infer<typeof UdpdateSettingsRequestValidation>
export type UpdateSettingsResponse = z.infer<typeof Settings.schema> | null

export async function updateSettings(
  req: UpdateSettingsRequest,
  ctx: MiddlewareContext,
): Promise<UpdateSettingsResponse> {
  const settings = await db().settings.update(ctx.claims.userId, req)

  return settings.data
}

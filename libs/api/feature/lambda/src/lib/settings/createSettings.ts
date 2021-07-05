import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { db, Settings } from "@perfolio/integrations/fauna"
import { z } from "zod"

export const CreateSettingsRequestValidation = Settings.createValidation
export type CreateSettingsRequest = z.infer<typeof CreateSettingsRequestValidation>
export type CreateSettingsResponse = z.infer<typeof Settings.schema> | null

export async function createSettings(
  req: CreateSettingsRequest,
  ctx: MiddlewareContext,
): Promise<CreateSettingsResponse> {
  const settings = await db().settings.create(ctx.claims.userId, req)

  return settings.data
}

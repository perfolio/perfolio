import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { db } from "@perfolio/integrations/fauna"
import { z } from "zod"
export const ChangeNameRequestValidation = z.object({
  name: z.string().min(3).max(64),
})

export type ChangeNameRequest = z.infer<typeof ChangeNameRequestValidation>
export async function changeName(
  { name }: ChangeNameRequest,
  ctx: MiddlewareContext,
): Promise<void> {
  await db().user.update(ctx.claims.userId, { name })
}

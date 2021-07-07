import { MiddlewareContext } from "@perfolio/api/feature/middleware"
import { db } from "@perfolio/integrations/fauna"

export async function deleteAccount(_: void, ctx: MiddlewareContext): Promise<void> {
  await db().user.delete(ctx.claims.userId)
}

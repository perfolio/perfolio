import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetTransaction = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTransaction), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const transaction = await db.transaction.findFirst({ where: { id } })

  if (!transaction) throw new NotFoundError()

  return transaction
})

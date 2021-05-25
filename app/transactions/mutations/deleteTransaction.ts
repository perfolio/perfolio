import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteTransaction = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteTransaction),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transaction = await db.transaction.deleteMany({ where: { id } })

    return transaction
  },
)

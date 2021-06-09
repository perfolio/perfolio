import { resolver } from "blitz"
import { db } from "db"
import { z } from "zod"

export default resolver.pipe(
  resolver.zod(z.object({ userId: z.string() })),
  resolver.authorize(),
  async ({ userId }) => {
    return db.user.fromId(userId)
  },
)

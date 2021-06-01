import { AuthorizationError, NotFoundError, resolver } from "blitz"
import db from "db"
import { DeleteTransaction } from "../validation"
export default resolver.pipe(
  resolver.zod(DeleteTransaction),
  resolver.authorize(),
  async ({ transactionId }, ctx) => {
    const userId = ctx.session.userId

    const transaction = await db.transaction.findUnique({
      where: { id: transactionId },
    })
    if (!transaction) {
      throw new NotFoundError(`No transaction found with id: ${transactionId}`)
    }

    if (transaction.userId !== userId) {
      throw new AuthorizationError(
        `You are not allowed to delete transactions of other users`,
      )
    }

    return db.transaction.delete({
      where: { id: transactionId },
    })
  },
)

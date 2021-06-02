import { Transaction } from ".prisma/client"
import db from "db"

import * as z from "zod"

export const GetTransactionsRequestValidation = z.object({
  userId: z.string().uuid(),
})

export type GetTransactionsRequest = z.infer<
  typeof GetTransactionsRequestValidation
>

export type GetTransactionsResponse = {
  transactions: Transaction[]
}

export async function getTransactions(
  req: GetTransactionsRequest,
): Promise<GetTransactionsResponse> {
  const transactions = await db.transaction.findMany({
    where: { userId: req.userId },
  })

  return { transactions }
}

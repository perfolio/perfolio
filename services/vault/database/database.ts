import { PrismaClient, Transaction, Prisma } from "@prisma/client"
export class Database {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient({ log: [] })
  }

  public async close(): Promise<void> {
    await this.db.$disconnect()
  }
  private escalate(err: Prisma.PrismaClientKnownRequestError): Error {
    if (err.code) {
      return new Error(
        `Database error [${err.code}], visit https://www.prisma.io/docs/reference/api-reference/error-reference for more information.`,
      )
    }
    return new Error(err.message)
  }

  public async getTransaction(id: string): Promise<Transaction | null> {
    return this.db.transaction
      .findUnique({
        where: { id },
      })
      .catch((err) => {
        throw this.escalate(err)
      })
  }
  public async getTransactions(userId: string): Promise<Transaction[]> {
    return this.db.transaction
      .findMany({
        where: { userId },
      })
      .catch((err) => {
        throw this.escalate(err)
      })
  }
  public async deleteTransaction(id: string): Promise<void> {
    await this.db.transaction
      .delete({
        where: { id },
      })
      .catch((err) => {
        throw this.escalate(err)
      })
  }
  public async setTransaction(
    transaction: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    let tx: Transaction | null
    try {
      tx = await this.db.transaction.findFirst({
        where: {
          executedAt: transaction.executedAt,
          userId: transaction.userId,
        },
      })

      if (tx) {
        tx = await this.db.transaction.update({
          where: { id: tx.id },
          data: transaction,
        })
      } else {
        tx = await this.db.transaction.create({
          data: transaction,
        })
      }
    } catch (err) {
      throw this.escalate(err)
    }
    return tx
  }
}

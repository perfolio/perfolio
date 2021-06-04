import { createDocument } from "./util"
import { Document } from "./document"
import { Client, Collection, Expr, query as q, Ref } from "faunadb"
import { z } from "zod"

export class Transaction extends Document<
  z.infer<typeof Transaction.validation>
> {
  public static readonly collection = "transactions"
  public static readonly index = {
    byUserId: "transactions_by_user_id",
    byId: "transaction_by_id"
  }

  /**
   * Data type for transactions
   */
  public static readonly validation = z.object({
    /**
     * Isin for stock assets
     */
    assetId: z.string(),
    userId: z.string(),
    volume: z.number(),
    value: z.number().positive(),
    executedAt: z.date(),
  })

  /**
   * Required fields to create a new symbol
   */
  public static readonly createValidation = Transaction.validation

  /**
   * Document schema. How the data is stored in fauna.
   */
  private static readonly schema = z
    .object({
      ref: z.instanceof(Expr),
      ts: z.number().int(),
      data: Transaction.validation,
    })
    .strict()

  /**
   * Load a transaction by its id
   */
  public static async fromId(
    client: Client,
    id: string,
  ): Promise<Transaction | null> {
    try {
      const res = await client
        .query(q.Get(Collection(this.collection), id))
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Transaction(Transaction.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable load symbolDocument from symbol: ${err}`)
    }
  }
  /**
   * Load all transactions from a user
   */
  public static async fromUserId(
    client: Client,
    userId: string,
  ): Promise<Transaction[]> {
    try {
      const res = await client
        .query<z.infer<typeof Transaction.schema>[]>(
          q.Map(
            q.Paginate(q.Match(q.Index(Transaction.index.byUserId), userId)),
            q.Lambda("transactionRef", q.Get(q.Var("transactionRef"))),
          ),
        )
        .catch(() => [])

      return res.map((tx) => new Transaction(Transaction.schema.parse(tx)))
    } catch (err) {
      throw new Error(`Unable load transactions from user: ${err}`)
    }
  }

  /**.
   * Create a new transaction document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Transaction.createValidation>,
  ): Promise<Transaction> {
    try {
      const res = await createDocument(
        client,
        Transaction.schema,
        Transaction.collection,
        input,
      )

      return new Transaction(Transaction.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable create transaction: ${err}`)
    }
  }

  /**
   * Delete this transaction
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(Ref(Collection(Transaction.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete transaction: ${err}`)
      })
  }
}

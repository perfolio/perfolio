import { authenticatedClient } from "../client"
import { createDocument, Document } from "./document"
import { Collection, Expr, query as q, Ref } from "faunadb"
import { QueryResponse } from "./queryResponse"
import { COLLECTION_USERS } from "../resources/collections/users"
import { z } from "zod"
import { INDEX_SESSION_BY_HANDLE } from "db/resources/indices/transaction_by_handle"
import { UserDocument } from "./user"
import { COLLECTION_SESSIONS } from "db/resources/collections/transactions"
import { COLLECTION_TRANSACTIONS } from "db/resources/collections/transactions"
/**
 * Domain data schema.
 */
const TransactionValidation = z.object({
  user: z.instanceof(UserDocument),
  assetId: z.string(),
  volume: z.number(),
  value: z.number().positive(),
  currency: z.enum(["USD"]),
  executedAt: z.number().int(),
})
export type Transaction = z.infer<typeof TransactionValidation>

/**
 * Required input data to create a new transaction.
 */
const CreateTransactionValidation = z.object({
  userId: z.string(),
  assetId: z.string(),
  volume: z.number(),
  value: z.number().positive(),
  currency: z.enum(["USD"]),
  executedAt: z.number().int(),
})
export type CreateTransaction = z.infer<typeof CreateTransactionValidation>

/**
 * Database schema for pages.
 */
const TransactionSchemaValidation = z
  .object({
    userRef: z.instanceof(Expr),
    assetId: z.string(),
    volume: z.number(),
    value: z.number().positive(),
    currency: z.enum(["USD"]),
    executedAt: z.number().int(),
  })
  .strict()
export type TransactionSchema = z.infer<typeof TransactionSchemaValidation>

/**
 * Handler for transaction documents.
 */
export class TransactionDocument extends Document<Transaction> {
  /**
   * Load a transaction by its unique handle
   */
  public static async fromId(
    id: string,
    token: string,
  ): Promise<TransactionDocument | null> {
    const client = authenticatedClient(token)
    const res = await client
      .query<QueryResponse<Transaction>>(
        q.Get(q.Collection(COLLECTION_TRANSACTIONS), id),
      )
      .catch((err) => {
        console.log(`No transaction found: ${err}`)
        /**
         * This happens when no transaction was created earlier
         */

        return null
      })
    if (res === null) {
      return null
    }
    return new TransactionDocument(client, res.ref, res.ts, res.data)
  }

  /**.
   * Create a new transaction document.
   */
  public static async create(
    input: CreateTransaction,
    token: string,
  ): Promise<TransactionDocument> {
    const validatedInput = await CreateTransactionValidation.parseAsync(
      input,
    ).catch((err) => {
      throw new Error(
        `Unable to create transaction: Input is not valid: ${err}`,
      )
    })
    const client = authenticatedClient(token)

    const data = await TransactionSchemaValidation.parseAsync({
      ...validatedInput,
      userRef: Ref(Collection(COLLECTION_USERS), validatedInput.userId),
    }).catch((err) => {
      throw new Error(
        `Unable to create transaction: Schema is not valid: ${err}`,
      )
    })

    const res = await createDocument(token, COLLECTION_SESSIONS, data)

    return new TransactionDocument(client, res.ref, res.ts, {
      ...res.data,
      user: await UserDocument.fromRef(token, data.userRef),
    })
  }


  /**
   * Delete this transaction
   */
  public async delete(): Promise<void> {
    await this.client.query(q.Delete(this.ref))
  }
}

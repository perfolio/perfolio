import { Client } from "faunadb"
import { z } from "zod"
import { Transaction } from "./documents/transaction"
import { Settings } from "./documents/settings"

/**
 * User facing wrapper for all document types.
 *
 * This mainly injects the token.
 */
export class Fauna {
  public readonly client: Client

  constructor(token?: string) {
    token = token ?? process.env["FAUNA_SERVER_KEY"]

    if (!token || token === "") {
      throw new Error(`NX_FAUNA_SERVER_KEY must be defined`)
    }

    this.client = new Client({ secret: token })
  }

  public get settings() {
    return {
      create: (userId: string, input: z.infer<typeof Settings.createValidation>) =>
        Settings.create(this.client, userId, input),
      update: (userId: string, input: z.infer<typeof Settings.updateValidation>) =>
        Settings.update(this.client, userId, input),
      fromUserId: (userId: string) => Settings.fromUserId(this.client, userId),
      delete: (userId: string) => Settings.delete(this.client, userId),
    }
  }

  public get transaction() {
    return {
      create: (input: z.infer<typeof Transaction.schema>) => Transaction.create(this.client, input),
      fromId: (id: string) => Transaction.fromId(this.client, id),
      fromUser: (userId: string) => Transaction.fromUserId(this.client, userId),
      delete: (transaction: Transaction) => transaction.delete(this.client),
    }
  }
}

export const db = () => new Fauna()

import { Client } from "faunadb"
import { Asset } from "./documents/asset"
import { RefreshToken } from "./documents/refresh_token"
import { User } from "./documents/user"
import { z } from "zod"
import { Session } from "./documents/session"
import { Transaction } from "./documents/transaction"

/**
 * User facing wrapper for all document types.
 *
 * This mainly injects the token.
 */
export class Fauna {
  public readonly client: Client

  constructor(token?: string) {
    token = token ?? process.env["NX_FAUNA_SERVER_KEY"]

    if (!token || token === "") {
      throw new Error(`NX_FAUNA_SERVER_KEY must be defined`)
    }

    this.client = new Client({ secret: token })
  }

  public get user() {
    return {
      create: (input: z.infer<typeof User.createValidation>) => User.create(this.client, input),
      update: (id: string, input: z.infer<typeof User.updateValidation>) =>
        User.update(this.client, id, input),
      fromId: (id: string) => User.fromId(this.client, id),
      fromEmail: (email: string) => User.fromEmail(this.client, email),
      delete: (userId: string) => User.delete(this.client, userId),
    }
  }

  public get asset() {
    return {
      create: (input: z.infer<typeof Asset.schema>) => Asset.create(this.client, input),
      fromSymbol: (symbol: string) => Asset.fromSymbol(this.client, symbol),
      fromIsin: (isin: string) => Asset.fromIsin(this.client, isin),
      delete: (asset: Asset) => asset.delete(this.client),
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

  public get refreshToken() {
    return {
      create: (input: z.infer<typeof RefreshToken.schema>) =>
        RefreshToken.create(this.client, input),
      fromHash: (token: string) => RefreshToken.fromHash(this.client, token),
      deleteFromUser: (userId: string) => RefreshToken.deleteFromUser(this.client, userId),
      delete: (token: RefreshToken) => token.delete(this.client),
    }
  }

  public get session() {
    return {
      create: (input: z.infer<typeof Session.createSchema>) => Session.create(this.client, input),
      fromSessionToken: (sessionToken: string) =>
        Session.fromSessionToken(this.client, sessionToken),
      delete: (sessionToken: string) => Session.delete(this.client, sessionToken),
      update: (input: z.infer<typeof Session.updateSchema>) => Session.update(this.client, input),
    }
  }
}

export const db = () => new Fauna()

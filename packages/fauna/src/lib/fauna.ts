import { Client } from "faunadb"
import { Symbol } from "./documents/symbol"
import { Token } from "./documents/token"
import { User } from "./documents/user"
import { Company } from "./documents/company"
import { Price } from "./documents/price"
import { Time } from "@perfolio/time"
import { z } from "zod"
import { Transaction } from "./documents/transaction"

/**
 * User facing wrapper for all document types.
 *
 * This mainly injects the token.
 */
class Fauna {
  public readonly client: Client

  constructor(token?: string) {
    token = token ?? process.env["FAUNA_SERVER_KEY"]

    if (!token || token === "") {
      throw new Error(`FAUNA_SERVER_KEY must be defined`)
    }

    this.client = new Client({ secret: token })
  }

  public get user() {
    return {
      create: (input: z.infer<typeof User.createValidation>) =>
        User.create(this.client, input),
      signin: (input: z.infer<typeof User.signinValidation>) =>
        User.signin(this.client, input),
      fromId: (id: string) => User.fromId(this.client, id),
      delete: (user: User) => user.delete(this.client),
    }
  }

  public get symbol() {
    return {
      create: (input: z.infer<typeof Symbol.schema>) =>
        Symbol.create(this.client, input),
      fromSymbol: (symbol: string) => Symbol.fromSymbol(this.client, symbol),
      fromIsin: (isin: string) => Symbol.fromIsin(this.client, isin),
      delete: (symbol: Symbol) => symbol.delete(this.client),
    }
  }

 
  public get transaction() {
    return {
      create: (input: z.infer<typeof Transaction.schema>) =>
        Transaction.create(this.client, input),
      fromId: (id: string) => Transaction.fromId(this.client, id),
      fromUser: (userId: string) => Transaction.fromUserId(this.client, userId),
      delete: (transaction: Transaction) => transaction.delete(this.client),
    }
  }
  public get company() {
    return {
      create: (input: z.infer<typeof Company.schema>) =>
        Company.create(this.client, input),
      fromSymbol: (symbol: string) => Company.fromSymbol(this.client, symbol),
      delete: (company: Company) => company.delete(this.client),
    }
  }
  public get price() {
    return {
      create: (input: z.infer<typeof Price.schema>) =>
        Price.create(this.client, input),
      fromSymbolAndTime: (symbol: string, time: Time) =>
        Price.fromSymbolAndTime(this.client, symbol, time),
      fromSymbol: (symbol: string, begin: Time, end: Time) =>
        Price.fromSymbol(this.client, symbol, begin, end),
      delete: (price: Price) => price.delete(this.client),
    }
  }
  public get token() {
    return {
      create: (input: z.infer<typeof Token.schema>) =>
        Token.create(this.client, input),
      fromToken: (token: string) =>
        Token.fromToken(this.client, token),
      delete: (token: Token) => token.delete(this.client),
    }
  }
}

export const fauna = new Fauna()

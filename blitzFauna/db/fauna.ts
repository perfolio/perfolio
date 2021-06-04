import { Client } from "faunadb"
import { Symbol } from "./documents/symbol"
import { Session } from "./documents/session"
import { User } from "./documents/user"

import { z } from "zod"

class Fauna {
  private readonly client: Client

  constructor(token?: string) {
    token = token ?? process.env.FAUNA_SERVER_KEY

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

      delete: (user: User) => user.delete(this.client),
    }
  }

  public get symbol() {
    return {
      create: (input: z.infer<typeof Symbol.createValidation>) =>
        Symbol.create(this.client, input),
      fromSymbol: (symbol: string) => Symbol.fromSymbol(this.client, symbol),
      fromIsin: (isin: string) => Symbol.fromIsin(this.client, isin),
      delete: (symbol: Symbol) => symbol.delete(this.client),
    }
  }

  public get session() {
    return {
      create: (input: z.infer<typeof Session.createValidation>) =>
        Session.create(this.client, input),
      fromHandle: (handle: string) => Session.fromHandle(this.client, handle),
      update: (session: Session, input: z.infer<typeof Session.updateValidation>) => session.update(this.client, input),
      delete: (session: Session) => session.delete(this.client),
    }
  }
}

export const fauna = new Fauna()

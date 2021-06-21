import { QueryResponse } from "./util"
import { Document } from "./document"
import { Client, Collection, query as q, Ref } from "faunadb"
import { z } from "zod"

export class Account extends Document<z.infer<typeof Account.schema>> {
  public static readonly collection = "accounts"
  public static readonly index = {
    byProviderAccountId: "account_by_provider_account_id",
  }

  /**
   * Data type for users
   */
  public static schema = z
    .object({
      userId: z.string(),
      providerId: z.string(),
      providerType: z.string(),
      providerAccountId: z.string(),
      refreshToken: z.string(),
      accessToken: z.string(),
      accessTokenExpires: z.boolean().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .strict()
  public static internalSchema = Account.schema
    .merge(
      z.object({
        createdAt: z.object({ value: z.date() }),
        updatedAt: z.object({ value: z.date() }),
      }),
    )
    .strict()

  public static createValidation = Account.schema.omit({
    createdAt: true,
    updatedAt: true,
  })
  /**
   * Load an account by its provider accountId
   */
  public static async fromProviderAccountId(
    client: Client,
    providerAccountId: string,
  ): Promise<Account | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Account.internalSchema>>>(
          q.Get(q.Match(q.Index(Account.index.byProviderAccountId), providerAccountId)),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Account(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable load account: ${err}`)
    }
  }

  public static fromInternal(
    res: QueryResponse<z.infer<typeof Account.internalSchema>>,
  ): QueryResponse<z.infer<typeof Account.schema>> {
    return {
      ...res,
      data: {
        ...res.data,
        createdAt: res.data.createdAt.value,
        updatedAt: res.data.updatedAt.value,
      },
    }
  }
  /**.
   * Create a new user document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Account.createValidation>,
  ): Promise<Account> {
    try {
      const data = this.createValidation.parse(input)
      /**
       * Creating an user is a special case because we have to handle the
       * password specifically.
       *
       * First a new user is created and then logged in as a single atomic
       * transaction.
       *
       * This returns a new user token which should be used from now on.
       */

      const res = await client.query<QueryResponse<z.infer<typeof Account.internalSchema>>>(
        q.Create(Collection(Account.collection), {
          data: {
            ...data,
            createdAt: q.Now(),
            updatedAt: q.Now(),
          },
        }),
      )

      return new Account(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable to create account: ${err}`)
    }
  }

  /**
   * Delete this account
   */
  public async delete(client: Client): Promise<void> {
    await client.query(q.Delete(Ref(Collection(Account.collection), this.id))).catch((err) => {
      throw new Error(`Unable to delete account: ${err}`)
    })
  }
}

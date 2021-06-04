import { createDocument } from "./util"
import { Document } from "./document"
import { Client, Collection, Expr, query as q, Ref } from "faunadb"
import { z } from "zod"

export class User extends Document<z.infer<typeof User.validation>> {
  public static readonly collection = "users"
  public static readonly index = {
    byEmail: "user_by_email",
  }

  /**
   * Data type for users
   */
  public static validation = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
  })

  /**
   * Required fields to create a new user
   */
  public static createValidation = User.validation.merge(
    z.object({ password: z.string() }),
  )

  /**
   * Required fields to sign in
   */
  public static signinValidation = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  /**
   * Document schema. How the data is stored in fauna.
   */
  private static readonly schema = z
    .object({
      ref: z.instanceof(Expr),
      ts: z.number().int(),
      data: User.validation,
    })
    .strict()

  /**
   * Load a user by its unique email
   */
  public static async fromEmail(
    client: Client,
    email: string,
  ): Promise<User | null> {
    try {
      const res = await client
        .query(q.Get(q.Match(q.Index(User.index.byEmail), email)))
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new User(User.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable load user from email: ${err}`)
    }
  }

  /**.
   * Create a new user document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof User.createValidation>,
  ): Promise<User> {
    try {
      const { password, ...data } = this.createValidation.parse(input)
      /**
       * Creating an user is a special case because we have to handle the
       * password specifically.
       *
       * First a new user is created and then logged in as a single atomic
       * transaction.
       *
       * This returns a new user token which should be used from now on.
       */

      const res = await client.query(
        q.Let(
          {
            /**
             * Login will return something like this:
             * {
             *    ref: Ref(Tokens(), "298752981921169927"),
             *    ts: 1621171895875000,
             *    instance: Ref(Collection("users"), "298480483928375813"),
             *    secret: 'xxx'
             * }.
             */
            token: q.Do(
              q.Create(Collection(User.collection), {
                data,
                credentials: {
                  password,
                },
              }),
              q.Login(
                q.Match(q.Index(User.index.byEmail), q.Casefold(data.email)),
                { password },
              ),
            ),
          },
          {
            secret: q.Select("secret", q.Var("token")),
            user: q.Get(q.Select("instance", q.Var("token"))),
          },
        ),
      )

      const { secret, user } = z
        .object({ secret: z.string(), user: this.schema })
        .parse(res)

      return new User(user)
    } catch (err) {
      throw new Error(`Unable create user: ${err}`)
    }
  }

  /**
   * Sign in an existing user.
   */
  public static async signin(
    client: Client,
    input: z.infer<typeof User.signinValidation>,
  ): Promise<User> {
    try {
      const { email, password } = this.signinValidation.parse(input)

      const res = await client.query(
        q.Let(
          {
            /**
             * Login will return something like this:
             * {
             *    ref: Ref(Tokens(), "298752981921169927"),
             *    ts: 1621171895875000,
             *    instance: Ref(Collection("users"), "298480483928375813"),
             *    secret: 'xxx'
             * }.
             */
            login: q.Login(
              q.Match(q.Index(this.index.byEmail), q.Casefold(email)),
              {
                password,
              },
            ),
          },
          {
            secret: q.Select("secret", q.Var("login")),
            user: q.Get(q.Select("instance", q.Var("login"))),
          },
        ),
      )

      const { secret, user } = z
        .object({ secret: z.string(), user: this.schema })
        .parse(res)

      return new User(user)
    } catch (err) {
      throw new Error(`Unable create company: ${err}`)
    }
  }

  /**
   * Delete this company
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(Ref(Collection(User.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete company: ${err}`)
      })
  }
}

import { authenticatedClient } from "../client"
import { Document } from "./document"
import { Expr, query as q } from "faunadb"
import { QueryResponse } from "./schema"
import { INDEX_USER_BY_EMAIL } from "../resources/indices/user_by_email"
import { COLLECTION_USERS } from "../resources/collections/users"
import { z } from "zod"
import { RoleValidation } from "types"
/**
 * Domain data schema.
 */
export const UserValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  /**
   * A fauna secret used to authenticate this user until they log out.
   */
  token: z.string().optional(),
  role: RoleValidation,
})
export type User = z.infer<typeof UserValidation>

/**
 * Required input data to create a new page.
 */
const CreateUserValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: RoleValidation,
})
export type CreateUser = z.infer<typeof CreateUserValidation>

/**
 * Possible fields to update.
 */
const UpdateUserValidation = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: RoleValidation.optional()
})
export type UpdateUser = z.infer<typeof UpdateUserValidation>

/**
 * Database schema for pages.
 */
const UserSchemaValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  hashedPassword: z.string(),
  role: RoleValidation,
})
export type UserSchema = z.infer<typeof UserSchemaValidation>

const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string(),
})

/**
 * Handler for user documents.
 */
export class UserDocument extends Document<User> {
  public static async fromRef(token: string, ref: Expr): Promise<UserDocument> {
    const client = authenticatedClient(token)
    const res = await client.query<QueryResponse<UserSchema>>(q.Get(ref))
    return new UserDocument(client, res.ref, res.ts, res.data)
  }

  public static async fromToken(token: string): Promise<UserDocument> {
    const client = authenticatedClient(token)
    const res = await client.query<QueryResponse<User>>(
      q.Get(q.CurrentIdentity()),
    )

    return new UserDocument(client, res.ref, res.ts, res.data)
  }

  /**.
   * Create a new user document.
   *
   * Used to sign up new users
   *
   * @token - A server token to bootstrap the creation. The returned
   * UserDocument will use a user scoped token that is returned from fauna
   * during signup.
   */
  public static async create(
    input: CreateUser,
    token: string,
  ): Promise<UserDocument> {
    const client = authenticatedClient(token)

    const validatedInput = CreateUserValidation.parse(input)

    /**
     * Transform the CreateUser input to UserSchema.
     */
    const data = {
      name: validatedInput.name,
      email: validatedInput.email,
    }

    /**
     * Creating an user is a special case because we have to handle the
     * password specifically.
     *
     * First a new user is created and then logged in as a single atomic
     * transaction.
     *
     * This returns a new user token which should be used from now on.
     */
    const res = await client.query<{
      secret: string
      user: QueryResponse<UserSchema>
    }>(
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
            q.Create(q.Collection(COLLECTION_USERS), {
              credentials: { password: input.password },
              data,
            }),
            q.Login(
              q.Match(q.Index(INDEX_USER_BY_EMAIL), q.Casefold(input.email)),
              { password: input.password },
            ),
          ),
        },
        {
          secret: q.Select("secret", q.Var("token")),
          user: q.Get(q.Select("instance", q.Var("token"))),
        },
      ),
    )

    /**
     * Create a new fauna client with the user specific token.
     */
    const userScopedClient = authenticatedClient(res.secret)

    /**
     * Transform the fauna response into User.
     */
    const userData = UserValidation.parse({
      ...res.user.data,
      token: res.secret,
    })

    return new UserDocument(
      userScopedClient,
      res.user.ref,
      res.user.ts,
      userData,
    )
  }

  /**
   * Sign into an existing user.
   *
   * @param input
   * @param input.email - The users email.
   * @param input.password - The users password.
   * @param token - A server token to bootstrap the signin. The returned
   * UserDocument will use a user scoped token that is returned from fauna
   * during signup.
   */
  public static async signin(
    input: { email: string; password: string },
    token: string,
  ): Promise<UserDocument> {
    const validatedInput = SigninValidation.parse(input)

    const client = authenticatedClient(token)

    /**
     * Authenticating a user is a special case because we have to handle the
     * password specifically.
     *
     * This returns a new user token which should be used from now on.
     */
    const res = await client.query<{
      secret: string
      user: QueryResponse<UserSchema>
    }>(
      q.Let(
        {
          /**
           * Login will return something like this:
           * {
           *    ref: Ref(Tokens(), "298752981921169927"),
           *    ts: 1621171895875000,
           *    instance: Ref(Collection("users"), "298480483928375813"),
           *    secret: 'fnEEJWJBEwACBwQkalwtMAIFNGVSqWfjzChL-FWiliL6MQmTsyE'
           * }.
           */
          token: q.Login(
            q.Match(
              q.Index(INDEX_USER_BY_EMAIL),
              q.Casefold(validatedInput.email),
            ),
            {
              password: validatedInput.password,
            },
          ),
        },

        {
          secret: q.Select("secret", q.Var("token")),
          user: q.Get(q.Select("instance", q.Var("token"))),
        },
      ),
    )

    /**
     * Create a new fauna client with the user specific token.
     */
    const userScopedClient = authenticatedClient(res.secret)

    /**
     * Transform the fauna response into User.
     */
    const userData = UserValidation.parse({
      ...res.user.data,
      token: res.secret,
    })

    return new UserDocument(
      userScopedClient,
      res.user.ref,
      res.user.ts,
      userData,
    )
  }

  public static async fromEmail(
    email: string,
    token: string,
  ): Promise<UserDocument> {
    const client = authenticatedClient(token)
    const res = await client.query<QueryResponse<User>>(
      q.Get(q.Match(q.Index(INDEX_USER_BY_EMAIL), email)),
    )
    return new UserDocument(client, res.ref, res.ts, res.data)
  }

  public async update(input: UpdateUser): Promise<void> {
    const res = await this.client.query<QueryResponse<User>>(
      q.Update(q.Ref(q.Collection(COLLECTION_USERS), this.ref), {
        data: input,
      }),
    )
    this.ts = res.ts
    this.data = UserValidation.parse(res.data)
  }

  /**
   * Delete this user
   */
  public async delete(): Promise<void> {
    await this.client.query(q.Delete(this.ref))
  }
}

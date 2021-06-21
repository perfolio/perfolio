import { QueryResponse } from "./util"
import { Document } from "./document"
import { Client, Collection, query as q, Ref } from "faunadb"
import { z } from "zod"

export class User extends Document<z.infer<typeof User.schema>> {
  public static readonly collection = "users"
  public static readonly index = {
    byEmail: "user_by_email",
  }

  /**
   * Data type for users
   */
  public static schema = z
    .object({
      name: z.string().optional(),
      email: z.string().email(),
      image: z.string().url().optional(),
      emailVerified: z.date().nullable().optional(),
      username: z.string().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .strict()

  /**
   * Overwrite date values.
   * In javascript you can accesst he raw date via `.value`
   */
  private static internalSchema = User.schema.merge(
    z.object({
      emailVerified: z.object({ value: z.date() }).nullable(),
      createdAt: z.object({ value: z.date() }),
      updatedAt: z.object({ value: z.date() }),
    }),
  )

  public static createValidation = User.schema.omit({ updatedAt: true, createdAt: true }).strict()
  public static updateValidation = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().url().optional(),
    emailVerified: z.date().optional(),
    username: z.string().optional(),
  })

  public static fromInternal(
    res: QueryResponse<z.infer<typeof User.internalSchema>>,
  ): QueryResponse<z.infer<typeof User.schema>> {
    return {
      ...res,
      data: {
        ...res.data,
        emailVerified: res.data.emailVerified ? res.data.emailVerified.value : null,
        createdAt: res.data.createdAt.value,
        updatedAt: res.data.updatedAt.value,
      },
    }
  }

  /**
   * Load a user by its unique email
   */
  public static async fromEmail(client: Client, email: string): Promise<User | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof User.internalSchema>>>(
          q.Get(q.Match(q.Index(User.index.byEmail), email)),
        )
        .catch(() => null)

      if (!res) {
        return null
      }

      return new User(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable load user from email: ${err}`)
    }
  }

  /**
   * Load a user by its unique id
   */
  public static async fromId(client: Client, id: string): Promise<User | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof User.internalSchema>>>(
          q.Get(q.Ref(q.Collection(this.collection), id)),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new User(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable load user from id: ${err}`)
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
      const data = this.createValidation.parse(input)
      const res = await client.query<QueryResponse<z.infer<typeof User.internalSchema>>>(
        q.Create(q.Collection(User.collection), {
          data: {
            name: data.name,
            email: data.email,
            image: data.image,
            emailVerified: data.emailVerified ? q.Time(data.emailVerified.toISOString()) : null,
            username: data.username,
            createdAt: q.Now(),
            updatedAt: q.Now(),
          },
        }),
      )

      return new User(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable to create user: ${err}`)
    }
  }
  public static async update(
    client: Client,
    id: string,
    input: z.infer<typeof User.updateValidation>,
  ): Promise<User> {
    try {
      const data = this.updateValidation.parse(input)
      const res = await client.query<QueryResponse<z.infer<typeof User.internalSchema>>>(
        q.Update(q.Ref(q.Collection(User.collection), id), {
          data: {
            name: data.name,
            email: data.email,
            image: data.image,
            emailVerified: data.emailVerified ? q.Time(data.emailVerified.toISOString()) : null,
            username: data.username,
            updatedAt: q.Now(),
          },
        }),
      )

      return new User(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable to update user: ${err}`)
    }
  }
  /**
   * Delete this user
   */
  public static async delete(client: Client, userId: string): Promise<void> {
    await client.query(q.Delete(Ref(Collection(User.collection), userId))).catch((err) => {
      throw new Error(`Unable to delete user: ${err}`)
    })
  }
}

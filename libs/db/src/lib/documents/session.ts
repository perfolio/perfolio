import { QueryResponse } from "./util"
import { Document } from "./document"
import { Client, query as q } from "faunadb"
import { z } from "zod"
import { v4 as uuid } from "uuid"
export class Session extends Document<z.infer<typeof Session.schema>> {
  public static readonly collection = "sessions"
  public static readonly index = {
    bySessionToken: "session_by_session_token",
  }

  /**
   * Data type for transactions
   */
  public static readonly schema = z
    .object({
      userId: z.string(),
      expires: z.date(),
      sessionToken: z.string(),
      accessToken: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .strict()

  private static internalSchema = Session.schema.merge(
    z.object({
      expires: z.object({ value: z.date() }),
      createdAt: z.object({ value: z.date() }),
      updatedAt: z.object({ value: z.date() }),
    }),
  )

  public static readonly createSchema = z.object({
    // Time in seconds until the session expires.
    expiresIn: z.number(),
    userId: z.string(),
  })

  public static readonly updateSchema = z.object({
    id: z.string(),
    expires: z.date(),
  })

  public static fromInternal(
    res: QueryResponse<z.infer<typeof Session.internalSchema>>,
  ): QueryResponse<z.infer<typeof Session.schema>> {
    return {
      ...res,
      data: {
        ...res.data,
        expires: res.data.expires.value,
        createdAt: res.data.createdAt.value,
        updatedAt: res.data.updatedAt.value,
      },
    }
  }
  /**
   * Load a session by its token
   */
  public static async fromSessionToken(
    client: Client,
    sessionToken: string,
  ): Promise<Session | null> {
    try {
      console.log({ sessionToken })
      const res = await client
        .query<QueryResponse<z.infer<typeof Session.internalSchema>>>(
          q.Get(q.Match(q.Index(Session.index.bySessionToken), sessionToken)),
        )
        .catch(() => null)

      console.log({ res })
      if (res === null) {
        return null
      }

      return new Session(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable load session from sessionToken: ${err}`)
    }
  }

  /**
   * Create a new transaction document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Session.createSchema>,
  ): Promise<Session> {
    try {
      const data = Session.createSchema.parse(input)
      const res = await client.query<QueryResponse<z.infer<typeof Session.internalSchema>>>(
        q.Create(q.Collection(Session.collection), {
          data: {
            userId: data.userId,
            expires: q.TimeAdd(q.Now(), data.expiresIn, "seconds"),
            sessionToken: uuid(),
            accessToken: uuid(),
            createdAt: q.Now(),
            updatedAt: q.Now(),
          },
        }),
      )

      return new Session(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable create transaction: ${err}`)
    }
  }

  /**
   * Update a session document.
   */
  public static async update(
    client: Client,
    input: z.infer<typeof Session.updateSchema>,
  ): Promise<Session> {
    try {
      const data = Session.updateSchema.parse(input)
      const res = await client.query<QueryResponse<z.infer<typeof Session.internalSchema>>>(
        q.Update(q.Ref(q.Collection(Session.collection), data.id), {
          data: {
            expires: q.Time(data.expires.toISOString()),
            updatedAt: q.Now(),
          },
        }),
      )

      return new Session(this.fromInternal(res))
    } catch (err) {
      throw new Error(`Unable create transaction: ${err}`)
    }
  }

  /**
   * Delete session by sessionToken
   */
  public static async delete(client: Client, sessionToken: string): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Match(q.Index(Session.index.bySessionToken), sessionToken))))
      .catch((err) => {
        throw new Error(`Unable to delete session: ${err}`)
      })
  }
}

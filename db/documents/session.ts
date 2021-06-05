import { Document } from "./document"
import { Client, query as q } from "faunadb"
import { z } from "zod"
import { QueryResponse } from "./util"
import { Time } from "app/time"

export class Session extends Document<z.infer<typeof Session.schema>> {
  public static readonly collection = "sessions"
  public static readonly index = {
    byHandle: "session_by_handle",
  }

  /**
   * Document schema. How the data is stored in fauna.
   */
  public static readonly schema = z
    .object({
      handle: z.string(),
      userId: z.string(),
      expiresAt: z.number().int().optional().nullable(),
      hashedSessionToken: z.string().optional().nullable(),
      antiCSRFToken: z.string().optional().nullable(),
      publicData: z.string().optional().nullable(),
      privateData: z.string().optional().nullable(),
    })
    .strict()

  /**
   * Fields that can be updated.
   */
  public static readonly update = Session.schema
    .omit({ handle: true, userId: true })
    .partial()

  /**
   * Load a session by its unique handle
   */
  public static async fromHandle(
    client: Client,
    handle: string,
  ): Promise<Session | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Session.schema>>>(
          q.Get(q.Match(q.Index(Session.index.byHandle), handle)),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Session(res)
    } catch (err) {
      throw new Error(`Unable load session from handle: ${err}`)
    }
  }

  /**
   * Create a new session document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Session.schema>,
  ): Promise<Session> {
    try {
      const data = Session.schema.parse(input)

      const res = await client
        .query<QueryResponse<z.infer<typeof Session.schema>>>(
          q.Create(q.Collection(Session.collection), {
            data,
          }),
        )
        .catch((err) => {
          throw new Error(
            `Unable to create document: ${err}, received: ${JSON.stringify(
              data,
              null,
              "  ",
            )}`,
          )
        })

      return new Session(res)
    } catch (err) {
      throw new Error(`Unable create session: ${err}`)
    }
  }
  /**
   * Update a session document.
   */
  public async update(
    client: Client,
    input: z.infer<typeof Session.update>,
  ): Promise<Session> {
    try {
      const data = Session.schema.parse(input)
      const res = await client.query<
        QueryResponse<z.infer<typeof Session.schema>>
      >(
        q.Update(q.Ref(q.Collection(Session.collection), this.id), {
          data,
        }),
      )

      return new Session(res)
    } catch (err) {
      throw new Error(`Unable to update session: ${err}`)
    }
  }
  /**
   * Delete this session
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Collection(Session.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete session: ${err}`)
      })
  }
}

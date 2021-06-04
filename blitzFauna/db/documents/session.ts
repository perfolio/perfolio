import { Document } from "./document"
import { Client, Collection, Expr, query as q, Ref } from "faunadb"
import { z } from "zod"
import { QueryResponse } from "./util"

export class Session extends Document<z.infer<typeof Session.validation>> {
  public static readonly collection = "sessions"
  public static readonly index = {
    byHandle: "session_by_handle",
  }

  /**
   * Data type for sessions
   */
  public static validation = z.object({
    handle: z.string(),
    userId: z.string(),
    expiresAt: z.date().optional(),
    hashedSessionToken: z.string().optional(),
    antiCSRFToken: z.string().optional(),
    publicData: z.string().optional(),
    privateData: z.string().optional(),
  })

  /**
   * Required fields to create a new session
   */
  public static createValidation = z.object({
    handle: z.string(),
    userId: z.string(),
    expiresAt: z.date().optional().nullable(),
    hashedSessionToken: z.string().optional().nullable(),
    antiCSRFToken: z.string().optional().nullable(),
    publicData: z.string().optional().nullable(),
    privateData: z.string().optional().nullable(),
  })
  /**
   * Required fields to update a session
   */
  public static updateValidation = z.object({
    handle: z.string().optional(),
    expiresAt: z.date().optional().nullable(),
    hashedSessionToken: z.string().optional().nullable(),
    antiCSRFToken: z.string().optional().nullable(),
    publicData: z.string().optional().nullable(),
    privateData: z.string().optional().nullable(),
  })

  /**
   * Document schema. How the data is stored in fauna.
   */
  private static readonly schema = z
    .object({
      handle: z.string(),
      userId: z.string(),
      expiresAt: z.number().int().optional(),
      hashedSessionToken: z.string().optional(),
      antiCSRFToken: z.string().optional(),
      publicData: z.string().optional(),
      privateData: z.string().optional(),
    })
    .strict()

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

      return new Session({
        ref: res.ref,
        ts: res.ts,
        data: {
          ...res.data,
          expiresAt: res.data.expiresAt
            ? new Date(res.data.expiresAt)
            : undefined,
        },
      })
    } catch (err) {
      throw new Error(`Unable load session from handle: ${err}`)
    }
  }

  /**
   * Create a new session document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Session.createValidation>,
  ): Promise<Session> {
    try {


      const data = Session.schema
        .parse({
          userId: input.userId,
          handle: input.handle,
          expiresAt: input.expiresAt?.getTime(),
          hashedSessionToken: input.hashedSessionToken ?? undefined,
          antiCSRFToken: input.antiCSRFToken ?? undefined,
          publicData: input.publicData ?? undefined,
          privateData: input.privateData ?? undefined,
        })


      const res = await client.query<
        QueryResponse<z.infer<typeof Session.schema>>
      >(
        q.Create(q.Collection(Session.collection), {
          data,
        }),
      )

      return new Session({
        ref: res.ref,
        ts: res.ts,
        data: {
          ...res.data,
          expiresAt: res.data.expiresAt
            ? new Date(res.data.expiresAt)
            : undefined,
        },
      })
    } catch (err) {
      throw new Error(`Unable create session: ${err}`)
    }
  }

  /**
   * Update a session document.
   */
  public async update(
    client: Client,
    input: z.infer<typeof Session.updateValidation>,
  ): Promise<Session> {
    try {
      const data = Session.validation.parse({
        handle: input.handle,
        expiresAt: input.expiresAt ?? undefined,
        hashedSessionToken: input.hashedSessionToken ?? undefined,
        antiCSRFToken: input.antiCSRFToken ?? undefined,
        publicData: input.publicData ?? undefined,
        privateData: input.privateData ?? undefined,
      })

      const res = await client.query<
        QueryResponse<z.infer<typeof Session.schema>>
      >(
        q.Update(Ref(Collection(Session.collection), this.id), {
          data,
        }),
      )

      return new Session({
        ref: res.ref,
        ts: res.ts,
        data: {
          ...res.data,
          expiresAt: res.data.expiresAt
            ? new Date(res.data.expiresAt)
            : undefined,
        },
      })
    } catch (err) {
      throw new Error(`Unable to update session: ${err}`)
    }
  }
  /**
   * Delete this session
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(Ref(Collection(Session.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete session: ${err}`)
      })
  }
}

import { createDocument } from "./util"
import { Document } from "./document"
import { Client, Collection, Expr, query as q, Ref } from "faunadb"
import { z } from "zod"

export class Session extends Document<z.infer<typeof Session.validation>> {
  public static readonly collection = "sessions"
  public static readonly index = {
    byHandle: "session_by_handle",
  }

  /**
   * Data type for sessions
   */
  public static validation = z.object({
    expiresAt: z.date().optional().nullable(),
    handle: z.string(),
    userId: z.string(),
    hashedSessionToken: z.string().optional().nullable(),
    antiCSRFToken: z.string().optional().nullable(),
    publicData: z.string().optional().nullable(),
    privateData: z.string().optional().nullable(),
  })

  /**
   * Required fields to create a new session
   */
  public static createValidation = Session.validation
   /**
   * Required fields to update a session
   */
    public static updateValidation = z.object({
      userId: z.string(),
      handle: z.string(),
      expiresAt: z.date().optional(),
      hashedSessionToken: z.string().optional(),
      antiCSRFToken: z.string().optional(),
      publicData: z.string().optional(),
      privateData: z.string().optional(),
    })

  /**
   * Document schema. How the data is stored in fauna.
   */
  private static readonly schema = z
    .object({
      ref: z.instanceof(Expr),
      ts: z.number().int(),
      data: Session.validation,
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
        .query(q.Get(q.Match(q.Index(Session.index.byHandle), handle)))
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Session(Session.schema.parse(res))
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
      const res = await createDocument(
        client,
        Session.schema,
        Session.collection,
        input,
      )

      return new Session(Session.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable create session: ${err}`)
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

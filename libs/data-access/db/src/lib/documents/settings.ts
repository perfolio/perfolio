import { QueryResponse } from "./util"
import { Document } from "./document"
import { Client, query as q } from "faunadb"
import { z } from "zod"

export class Settings extends Document<z.infer<typeof Settings.schema>> {
  public static readonly collection = "settings"
  public static readonly index = {
    byUserId: "settings_by_settings_id",
  }

  /**
   * Data type for settings
   */
  public static schema = z
    .object({
      userId: z.string(),
      defaultCurrency: z.string(),
      defaultExchange: z.string(),
    })
    .strict()
  public static createValidation = z
    .object({
      defaultCurrency: z.string(),
      defaultExchange: z.string(),
    })
    .strict()
  public static updateValidation = z
    .object({
      defaultCurrency: z.string().optional(),
      defaultExchange: z.string().optional(),
    })
    .strict()

  /**
   * Load a setting by its userId
   */
  public static async fromUserId(client: Client, userId: string): Promise<Settings | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Settings.schema>>>(
          q.Get(q.Match(q.Index(Settings.index.byUserId), userId)),
        )
        .catch(() => null)

      if (!res) {
        return null
      }

      return new Settings(res)
    } catch (err) {
      throw new Error(`Unable load settings from email: ${err}`)
    }
  }

  /**.
   * Create a new settings document.
   */
  public static async create(
    client: Client,
    userId: string,
    input: z.infer<typeof Settings.createValidation>,
  ): Promise<Settings> {
    try {
      const data = this.schema.parse(input)
      const res = await client.query<QueryResponse<z.infer<typeof Settings.schema>>>(
        q.Create(q.Collection(Settings.collection), {
          data: {
            ...data,
            userId,
          },
        }),
      )

      return new Settings(res)
    } catch (err) {
      throw new Error(`Unable to create settings: ${err}`)
    }
  }
  public static async update(
    client: Client,
    userId: string,
    input: z.infer<typeof Settings.updateValidation>,
  ): Promise<Settings> {
    try {
      const data = this.updateValidation.parse(input)
      const res = await client.query<QueryResponse<z.infer<typeof Settings.schema>>>(
        q.Update(q.Select("ref", q.Get(q.Match(q.Index(Settings.index.byUserId), userId))), {
          data: {
            ...data,
            userId,
          },
        }),
      )

      return new Settings(res)
    } catch (err) {
      throw new Error(`Unable to update settings: ${err}`)
    }
  }

  /**
   * Delete this settings
   */
  public static async delete(client: Client, userId: string): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Match(q.Index(Settings.index.byUserId), userId))))
      .catch((err) => {
        throw new Error(`Unable to delete settings: ${err}`)
      })
  }
}

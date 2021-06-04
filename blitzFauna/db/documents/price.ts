import { createDocument } from "./util"
import { Document } from "./document"
import { Client, Collection, Expr, query as q, Ref } from "faunadb"
import { z } from "zod"
import { Time } from "app/time"

export class Price extends Document<z.infer<typeof Price.validation>> {
  public static readonly collection = "prices"
  public static readonly index = {
    bySymbolAndDate: "price_by_symbol_and_date",
  }

  /**
   * Data type for prices
   */
  public static validation = z.object({
    symbol: z.string(),
    time: z.date(),
    value: z.number().positive(),
  })

  /**
   * Required fields to create a new price
   */
  public static createValidation = Price.validation
  /**
   * Required fields to update a price
   */
  public static updateValidation = z.object({
    symbol: z.string(),
    time: z.date(),
    value: z.number().positive(),
  })

  /**
   * Document schema. How the data is stored in fauna.
   */
  private static readonly schema = z
    .object({
      ref: z.instanceof(Expr),
      ts: z.number().int(),
      data: Price.validation,
    })
    .strict()

  /**
   * Load a price by its symbol and date
   */
  public static async fromSymbolAndTime(
    client: Client,
    symbol: string,
    time: Time
  ): Promise<Price | null> {
    try {
      const res = await client
        .query(q.Get(q.Match(q.Index(Price.index.bySymbolAndDate), symbol, time.toDate())))
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Price(Price.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable load price from symbol and time: ${err}`)
    }
  }

  /**
   * Create a new price document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Price.createValidation>,
  ): Promise<Price> {
    try {
      const res = await createDocument(
        client,
        Price.schema,
        Price.collection,
        input,
      )

      return new Price(Price.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable create price: ${err}`)
    }
  }

  /**
   * Delete this price
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(Ref(Collection(Price.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete price: ${err}`)
      })
  }
}

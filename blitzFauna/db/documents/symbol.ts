import { createDocument } from "./util"
import { Document } from "./document"
import { Client, Collection, Expr, query as q, Ref } from "faunadb"
import { z } from "zod"

export class Symbol extends Document<z.infer<typeof Symbol.validation>> {
  public static readonly collection = "symbols"
  public static readonly index = {
    bySymbol: "symbol_by_symbol",
    byIsin: "symbol_by_isin"
  }

  /**
   * Data type for symbols
   */
  public static validation = z.object({
    isin: z.string(),
    symbol: z.string(),
  })

  /**
   * Required fields to create a new symbol
   */
  public static createValidation = Symbol.validation

  /**
   * Document schema. How the data is stored in fauna.
   */
  private static readonly schema = z
    .object({
      ref: z.instanceof(Expr),
      ts: z.number().int(),
      data: z.object({
        symbol: z.string(),
        isin: z.string(),
      }),
    })
    .strict()

  /**
   * Load a symbol by its unique symbol
   */
  public static async fromSymbol(
    client: Client,
    symbol: string,
  ): Promise<Symbol | null> {
    try {
      const res = await client
        .query(q.Get(q.Match(q.Index(Symbol.index.bySymbol), symbol)))
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Symbol(Symbol.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable load symbolDocument from symbol: ${err}`)
    }
  }
  /**
   * Load a symbol by its unique isin
   */
  public static async fromIsin(
    client: Client,
    isin: string,
  ): Promise<Symbol | null> {
    try {
      const res = await client
        .query(q.Get(q.Match(q.Index(Symbol.index.byIsin), isin)))
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Symbol(Symbol.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable load symbolDocument from symbol: ${err}`)
    }
  }

  /**.
   * Create a new symbol document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Symbol.createValidation>,
  ): Promise<Symbol> {
    try {
      const res = await createDocument(
        client,
        Symbol.schema,
        Symbol.collection,
        input,
      )

      return new Symbol(Symbol.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable create symbolDocument: ${err}`)
    }
  }

  /**
   * Delete this symbol
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(Ref(Collection(Symbol.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete symbolDocument: ${err}`)
      })
  }
}

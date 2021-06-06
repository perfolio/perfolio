import { QueryResponse } from "./util"
import { Document } from "./document"
import { Client, query as q } from "faunadb"
import { z } from "zod"

export class Symbol extends Document<z.infer<typeof Symbol.schema>> {
  public static readonly collection = "symbols"
  public static readonly index = {
    bySymbol: "symbol_by_symbol",
    byIsin: "symbol_by_isin",
  }

  /**
   * Data type for symbols
   */
  public static schema = z
    .object({
      isin: z.string(),
      symbol: z.string(),
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
        .query<QueryResponse<z.infer<typeof Symbol.schema>>>(
          q.Get(q.Match(q.Index(Symbol.index.bySymbol), q.UpperCase(symbol))),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Symbol(res)
    } catch (err) {
      throw new Error(`Unable load symbol from symbol: ${err}`)
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
        .query<QueryResponse<z.infer<typeof Symbol.schema>>>(
          q.Get(q.Match(q.Index(Symbol.index.byIsin), q.UpperCase(isin))),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Symbol(res)
    } catch (err) {
      throw new Error(`Unable load symbol from symbol: ${err}`)
    }
  }

  /**.
   * Create a new symbol document.
   *
   * Skips creation If one already exists.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Symbol.schema>,
  ): Promise<Symbol> {
    try {
      const data = Symbol.schema.parse(input)
      const match = q.Match(
        q.Index(Symbol.index.bySymbol),
        q.UpperCase(data.symbol),
      )
      const res = await client.query<
        QueryResponse<z.infer<typeof Symbol.schema>>
      >(
        q.If(
          q.Exists(match),
          q.Get(match),
          q.Create(q.Collection(this.collection), {
            data: {
              isin: q.UpperCase(data.isin),
              symbol: q.UpperCase(data.symbol),
            },
          }),
        ),
      )
      return new Symbol(res)
    } catch (err) {
      throw new Error(`Unable create symbol: ${err}`)
    }
  }

  /**
   * Delete this symbol
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Collection(Symbol.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete symbol: ${err}`)
      })
  }
}

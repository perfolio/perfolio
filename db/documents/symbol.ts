import { createDocument, QueryResponse } from "./util"
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
          q.Get(q.Match(q.Index(Symbol.index.bySymbol), q.Casefold(symbol))),
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
          q.Get(q.Match(q.Index(Symbol.index.byIsin), q.Casefold(isin))),
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
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Symbol.schema>,
  ): Promise<Symbol> {
    const data = Symbol.schema.parse(input)

    try {
      const res = await client.query<
        QueryResponse<z.infer<typeof Symbol.schema>>
      >(
        q.Create(q.Collection(Symbol.collection), {
          data: {
            isin: q.Casefold(data.isin),
            symbol: q.Casefold(data.symbol),
          },
        }),
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

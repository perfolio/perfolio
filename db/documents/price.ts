import { createDocument } from "./util"
import { Document } from "./document"
import { QueryResponse } from "./util"
import { Client, query as q, Expr } from "faunadb"
import { z } from "zod"
import { Time } from "app/time"

export class Price extends Document<z.infer<typeof Price.schema>> {
  public static readonly collection = "prices"
  public static readonly index = {
    bySymbolAndTime: "price_by_symbol_and_time",
    bySymbol: "prices_by_symbol",
  }

  /**
   * Document schema. How the data is stored in fauna.
   */
  public static readonly schema = z.object({
    symbol: z.string().regex(/^[a-z]+$/),
    time: z.number().int(),
    value: z.number(),
  })

  /**
   * Load a price by its symbol and date
   */
  public static async fromSymbolAndTime(
    client: Client,
    symbol: string,
    time: Time,
  ): Promise<Price | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Price.schema>>>(
          q.Get(
            q.Match(q.Index(Price.index.bySymbolAndTime), [
              symbol,
              time.unix(),
            ]),
          ),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Price(res)
    } catch (err) {
      throw new Error(`Unable load price from symbol and time: ${err}`)
    }
  }

  /**
   * Load prices within in a range
   */
  public static async fromSymbol(
    client: Client,
    symbol: string,
    begin: Time,
    end: Time,
  ): Promise<Price[]> {
    try {
      const res = await client.query<{
        data: {
          ref: Expr
          ts: number
          data: z.infer<typeof Price.schema>
        }[]
      }>(
        q.Map(
          q.Paginate(
            q.Range(
              q.Match(q.Index(this.index.bySymbol), q.Casefold(symbol)),
              begin.unix(),
              end.unix(),
            ),
          ),
          q.Lambda("x", {
            symbol: q.Select(0, q.Var("x")),
            time: q.Select(1, q.Var("x")),
            value: q.Select(2, q.Var("x")),
          }),
        ),
      )
      return res.data.map((price) => new Price(price))
    } catch (err) {
      throw new Error(`Unable load prices from symbol: ${err}`)
    }
  }

  /**
   * Create a new price document or return the existing one.
   *
   * This is not an upsert.
   * We can assume the value of a price does not change after we have fetched it once.
   * So upserting every time would incur more charges for no benefit.
   *
   * A price is updated when the TTL of the document runs out and the price is refetched.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Price.schema>,
  ): Promise<Price> {
    try {
      const data = Price.schema.parse(input)
      const match = q.Match(q.Index(Price.index.bySymbolAndTime), [
        data.symbol,
        data.time,
      ])
      const res = await client.query<
        QueryResponse<z.infer<typeof Price.schema>>
      >(
        q.If(
          q.Exists(match),
          q.Get(match),
          q.Create(q.Collection(this.collection), {
            data: {
              ...data,
              symbol: q.Casefold(data.symbol),
            },
          }),
        ),
      )
      return new Price(res)
    } catch (err) {
      throw new Error(`Unable create price: ${err}`)
    }
  }

  /**
   * Delete this price
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Collection(Price.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete price: ${err}`)
      })
  }
}

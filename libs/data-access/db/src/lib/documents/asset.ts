import { QueryResponse } from "./util"
import { Document } from "./document"
import { Client, query as q } from "faunadb"
import { z } from "zod"

export class Asset extends Document<z.infer<typeof Asset.schema>> {
  public static readonly collection = "assets"
  public static readonly index = {
    bySymbol: "asset_by_symbol",
    byIsin: "asset_by_isin",
  }

  /**
   * Data type for assets
   */
  public static schema = z
    .object({
      isin: z.string(),
      symbol: z.string(),
    })
    .strict()

  /**
   * Load a asset by its unique asset
   */
  public static async fromSymbol(client: Client, symbol: string): Promise<Asset | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Asset.schema>>>(
          q.Get(q.Match(q.Index(Asset.index.bySymbol), q.UpperCase(symbol))),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Asset(res)
    } catch (err) {
      throw new Error(`Unable load asset from symbol: ${err}`)
    }
  }
  /**
   * Load a asset by its unique isin
   */
  public static async fromIsin(client: Client, isin: string): Promise<Asset | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Asset.schema>>>(
          q.Get(q.Match(q.Index(Asset.index.byIsin), q.UpperCase(isin))),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Asset(res)
    } catch (err) {
      throw new Error(`Unable load asset from asset: ${err}`)
    }
  }

  /**.
   * Create a new asset document.
   *
   * Skips creation If one already exists.
   */
  public static async create(client: Client, input: z.infer<typeof Asset.schema>): Promise<Asset> {
    try {
      const data = Asset.schema.parse(input)
      const match = q.Match(q.Index(Asset.index.bySymbol), q.UpperCase(data.symbol))
      const res = await client.query<QueryResponse<z.infer<typeof Asset.schema>>>(
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
      return new Asset(res)
    } catch (err) {
      throw new Error(`Unable create asset: ${err}`)
    }
  }

  /**
   * Delete this asset
   */
  public async delete(client: Client): Promise<void> {
    await client.query(q.Delete(q.Ref(q.Collection(Asset.collection), this.id))).catch((err) => {
      throw new Error(`Unable to delete asset: ${err}`)
    })
  }
}

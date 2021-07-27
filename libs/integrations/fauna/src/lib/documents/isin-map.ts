import { QueryResponse } from "./util"
import { Document } from "./document"
import { Client, query as q } from "faunadb"
import { z } from "zod"

export class IsinMap extends Document<z.infer<typeof IsinMap.schema>> {
  public static readonly collection = "isinMap"
  public static readonly index = {
    all: "isin_map",
  }

  /**
   * Data type for the isin maps
   */
  public static readonly schema = z.array(
    z
      .object({
        isin: z.string(),
        ticker: z.string(),
        /**
         * The company name
         */
        name: z.number(),
      })
      .strict(),
  )

  /**
   * Load all isin maps
   */
  public static async get(client: Client): Promise<IsinMap | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof IsinMap.schema>>>(
          q.Map(
            q.Paginate(q.Match(q.Index(this.index.all))),
            q.Lambda((x) => q.Get(x)),
          ),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new IsinMap(res)
    } catch (err) {
      throw new Error(`Unable to load isin map: ${err}`)
    }
  }

  /**.
   * Create a new transaction document.
   */
  public static async update(
    client: Client,
    id: string,
    input: z.infer<typeof IsinMap.schema>,
  ): Promise<IsinMap> {
    try {
      const data = IsinMap.schema.parse(input)
      const res = await client.query<QueryResponse<z.infer<typeof IsinMap.schema>>>(
        q.Update(q.Ref(q.Collection(IsinMap.collection), id), {
          data,
        }),
      )

      return new IsinMap(res)
    } catch (err) {
      throw new Error(`Unable to update isinMap: ${err}`)
    }
  }
}

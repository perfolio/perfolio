import { createDocument } from "./util"
import { Document } from "./document"
import { QueryResponse } from "./util"
import { Client, query as q } from "faunadb"
import { z } from "zod"

export class Company extends Document<z.infer<typeof Company.schema>> {
  public static readonly collection = "companies"
  public static readonly index = {
    bySymbol: "company_by_symbol",
  }

  /**
   * Document schema. How the data is stored in fauna.
   */
  public static readonly schema = z
    .object({
      symbol: z.string(),
      logo: z.string(),
      name: z.string().optional(),
      exchange: z.string().optional(),
      industry: z.string().optional(),
      website: z.string().optional(),
      description: z.string().optional(),
      ceo: z.string().optional(),
      issueType: z.string().optional(),
      sector: z.string().optional(),
      employees: z.number().optional(),
      securityName: z.string().optional(),
      primarySicCode: z.number().optional(),
      address: z.string().optional(),
      address2: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      phone: z.string().optional(),
    })
    .strict()

  /**
   * Load a company by its unique symbol
   */
  public static async fromSymbol(client: Client, symbol: string): Promise<Company | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Company.schema>>>(
          q.Get(q.Match(q.Index(Company.index.bySymbol), symbol)),
        )
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Company(res)
    } catch (err) {
      throw new Error(`Unable load company from symbol: ${err}`)
    }
  }

  /**.
   * Create a new company document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Company.schema>,
  ): Promise<Company> {
    try {
      const res = await createDocument(client, Company.schema, Company.collection, input)

      return new Company(res)
    } catch (err) {
      throw new Error(`Unable create company: ${err}`)
    }
  }

  /**
   * Delete this company
   */
  public async delete(client: Client): Promise<void> {
    await client.query(q.Delete(q.Ref(q.Collection(Company.collection), this.id))).catch((err) => {
      throw new Error(`Unable to delete company: ${err}`)
    })
  }
}

import { createDocument } from "./util"
import { Document } from "./document"
import { Client, Collection, Expr, query as q, Ref } from "faunadb"
import { z } from "zod"

export class Company extends Document<z.infer<typeof Company.validation>> {
  public static readonly collection = "companies"
  public static readonly index = {
    bySymbol: "company_by_symbol",
  }

  /**
   * Data type for companies
   */
  public static validation = z.object({
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

  /**
   * Required fields to create a new symbol
   */
  public static createValidation = Company.validation

  /**
   * Document schema. How the data is stored in fauna.
   */
  private static readonly schema = z
    .object({
      ref: z.instanceof(Expr),
      ts: z.number().int(),
      data: Company.validation,
    })
    .strict()

  /**
   * Load a company by its unique symbol
   */
  public static async fromSymbol(
    client: Client,
    symbol: string,
  ): Promise<Company | null> {
    try {
      const res = await client
        .query(q.Get(q.Match(q.Index(Company.index.bySymbol), symbol)))
        .catch(() => null)

      if (res === null) {
        return null
      }

      return new Company(Company.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable load company from symbol: ${err}`)
    }
  }


  /**.
   * Create a new company document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Company.createValidation>,
  ): Promise<Company> {
    try {
      const res = await createDocument(
        client,
        Company.schema,
        Company.collection,
        input,
      )

      return new Company(Company.schema.parse(res))
    } catch (err) {
      throw new Error(`Unable create company: ${err}`)
    }
  }

  /**
   * Delete this company
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(Ref(Collection(Company.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete company: ${err}`)
      })
  }
}

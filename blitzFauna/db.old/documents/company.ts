import { authenticatedClient } from "../client"
import { createDocument, Document } from "./document"
import { Collection, query as q, Ref } from "faunadb"
import { QueryResponse } from "./queryResponse"
import { z } from "zod"
import { INDEX_COMPANY_BY_SYMBOL,COLLECTION_SESSIONS,COLLECTION_USERS } from "db"
/**
 * Domain data schema.
 */
export const CompanyValidation = z.object({
  // Ticker of the company
  symbol: z.string(),
  // Logo of the company
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
export type Company = z.infer<typeof CompanyValidation>

/**
 * Required input data to create a new company.
 */
export const CreateCompanyValidation = CompanyValidation
export type CreateCompany = z.infer<typeof CreateCompanyValidation>

/**
 * Possible fields to update.
 */
export const UpdateCompanyValidation = z.object({
  symbol: z.string()
}).merge(CompanyValidation.partial())
export type UpdateCompany = z.infer<typeof UpdateCompanyValidation>

/**
 * Database schema for pages.
 */
const CompanySchemaValidation = z.object({
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
}).strict()
export type CompanySchema = z.infer<typeof CompanySchemaValidation>

/**
 * Handler for company documents.
 */
export class CompanyDocument extends Document<Company> {
  /**
   * Load a company by its unique symbol
   */
  public static async fromSymbol(
    symbol: string,
    token: string,
  ): Promise<CompanyDocument | null> {
    const client = authenticatedClient(token)
    const res = await client
      .query<QueryResponse<Company>>(
        q.Get(q.Match(q.Index(INDEX_COMPANY_BY_SYMBOL), symbol)),
      )
      .catch((err) => {
        console.log(`No company found: ${err}`)
        return null
      })
    if (res === null) {
      return null
    }
    return new CompanyDocument(client, res.ref, res.ts, res.data)
  }

  /**.
   * Create a new company document.
   */
  public static async create(
    input: CreateCompany,
    token: string,
  ): Promise<CompanyDocument> {
    const validatedInput = await CreateCompanyValidation.parseAsync(
      input,
    ).catch((err) => {
      throw new Error(`Unable to create company: Input is not valid: ${err}`)
    })
    const client = authenticatedClient(token)

    const data = await CompanySchemaValidation.parseAsync(validatedInput).catch((err) => {
      throw new Error(`Unable to create company: Schema is not valid: ${err}`)
    })

    const res = await createDocument(token, COLLECTION_SESSIONS, data)

    return new CompanyDocument(client, res.ref, res.ts, res.data)
  }

  public async update(input: UpdateCompany): Promise<void> {
    const validatedInput = await UpdateCompanyValidation.parseAsync(
      input,
    ).catch((err) => {
      throw new Error(`Unable to update company: Input is not valid: ${err}`)
    })
    const res = await this.client.query<QueryResponse<Company>>(
      q.Update(q.Ref(q.Collection(COLLECTION_SESSIONS), this.ref), {
        data: validatedInput,
      }),
    )
    this.ts = res.ts
    this.data = await CompanyValidation.parseAsync(res.data).catch((err) => {
      throw new Error(
        `Unable to update company: Fauna response is invalid: ${err}`,
      )
    })
  }

  /**
   * Delete this user
   */
  public async delete(): Promise<void> {
    await this.client.query(q.Delete(this.ref))
  }
}

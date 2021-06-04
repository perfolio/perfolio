import { authenticatedClient } from "../client"
import { createDocument, Document } from "./document"
import { Collection, query as q, Ref } from "faunadb"
import { QueryResponse } from "./queryResponse"
import { COLLECTION_USERS } from "../resources/collections/users"
import { z } from "zod"
import { INDEX_SESSION_BY_HANDLE } from "db/resources/indices/symbol_by_handle"
import { UserDocument } from "./user"
import { COLLECTION_SESSIONS } from "db/resources/collections/symbols"
import { INDEX_SYMBOL_BY_SYMBOL } from "db/resources/indices/symbol_by_symbol"
import { COLLECTION_SYMBOLS } from "db/resources/collections/symbols"
/**
 * Domain data schema.
 */
const SymbolValidation = z.object({
  symbol: z.string(),
  isin: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/)
})
export type Symbol = z.infer<typeof SymbolValidation>

/**
 * Required input data to create a new symbol.
 */
const CreateSymbolValidation = SymbolValidation
export type CreateSymbol = z.infer<typeof CreateSymbolValidation>


/**
 * Database schema for pages.
 */
const SymbolSchemaValidation = SymbolValidation.strict()
export type SymbolSchema = z.infer<typeof SymbolSchemaValidation>

/**
 * Handler for symbol documents.
 */
export class SymbolDocument extends Document<Symbol> {
  /**
   * Load a symbol by its unique symbol
   */
  public static async fromSymbol(
    symbol: string,
    token: string,
  ): Promise<SymbolDocument|null> {
    const client = authenticatedClient(token)
    const res = await client.query<QueryResponse<Symbol>>(
      q.Get(q.Match(q.Index(INDEX_SYMBOL_BY_SYMBOL), symbol)),
    ).catch(err=>{
      console.log(`No symbol found: ${err}`)
      /**
       * This happens when no symbol was created earlier
       */

      return null

    })
    if (res === null){
      return null
    }
    return new SymbolDocument(client, res.ref, res.ts, res.data)
  }

  /**.
   * Create a new symbol document.
   */
  public static async create(
    input: CreateSymbol,
    token: string,
  ): Promise<SymbolDocument> {
    const validatedInput = await CreateSymbolValidation.parseAsync(input).catch(err=>{
      throw new Error(`Unable to create symbol: Input is not valid: ${err}`)
    })
    const client = authenticatedClient(token)

    const data = await SymbolSchemaValidation.parseAsync(validatedInput).catch(err => {
      throw new Error(`Unable to create symbol: Schema is not valid: ${err}`)
    })

    const res = await createDocument(token, COLLECTION_SYMBOLS, data)



    return new SymbolDocument(client, res.ref, res.ts, {
      ...res.data,
    })
  }


  /**
   * Delete this symbol
   */
  public async delete(): Promise<void> {
    await this.client.query(q.Delete(this.ref))
  }
}

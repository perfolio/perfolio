import { Client, Expr, query as q } from "faunadb"
import { z } from "zod"
/**.
 * Create a document in a collection.
 *
 * This does not do any validation and should not be used by itself.
 *
 * Specific document classes will use this method to do the actual saving.
 * They should all follow the same steps:
 *   1. Transform input data to fauna schema type
 *   2. Call `createDocument`
 *   3. Transform output to domain specific document type
 *
 */
export async function createDocument<Schema>(
  client: Client,
  validator: z.AnyZodObject,
  collectionName: string,
  data: Schema,
): Promise<QueryResponse<Schema>> {
  
  try {
    validator.parse(data)
  } catch (err) {
    throw new Error(
      `Unable to save document to "${collectionName}": Schema validation failed: ${err}, received: ${data}`,
    )
  }

  return await client.query<QueryResponse<Schema>>(
    q.Create(q.Collection(collectionName), {
      data,
    }),
  )
}
/**
 * This is what the fauna `Get` function usually returns .
 */
export interface QueryResponse<T> {
  ref: Expr
  ts: number
  data: T
}

/**
 * Creates a fauna query response validator with injected data type
 */
export function queryResponseValidator(dataValidation: z.AnyZodObject) {
  return z.object({
    ref: z.instanceof(Expr),
    ts: z.number().int(),
    data: dataValidation,
  })
}

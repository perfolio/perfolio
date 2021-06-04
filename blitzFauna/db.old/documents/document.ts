import { Client, Expr, query as q } from "faunadb"
import { QueryResponse } from "./queryResponse"
import { authenticatedClient } from "../client"

/**
 * Document class to provide common methods to all documents.
 */
export abstract class Document<Data> {
  public readonly ref: Expr
  public ts: number
  public data: Data
  public readonly client: Client

  public constructor(client: Client, ref: Expr, ts: number, data: Data) {
    this.ref = ref
    this.ts = ts
    this.data = data
    this.client = client
  }
  /**
   * Returns a global unique id for this document.
   *
   * The id consists of the collection name followed by the document id.
   */
  public guid(): string {
    const v = Object.values(this.ref)[0]
    return `${v.collection.id}_${v.id}`
  }
  /**
   * The unique document id within its collection.
   */
  public id(): string {
    return Object.values(this.ref)[0].id
  }
}

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
  token: string,
  collectionName: string,
  data: Schema,
): Promise<QueryResponse<Schema>> {
  const client = authenticatedClient(token)

  return await client.query<QueryResponse<Schema>>(
    q.Create(q.Collection(collectionName), {
      data,
    }),
  )
}
/**
 * Load a document by its collection and id.
 */
export async function loadDocument<Schema>(
  token: string,
  collectionName: string,
  id: string,
): Promise<QueryResponse<Schema>> {
  const client = authenticatedClient(token)

  return await client.query<QueryResponse<Schema>>(
    q.Get(q.Ref(q.Collection(collectionName), id)),
  )
}

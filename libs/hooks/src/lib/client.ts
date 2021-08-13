import { Sdk, getSdk } from "@perfolio/api/graphql"
import { DocumentNode } from "graphql"
import { GraphqlError } from "@perfolio/util/errors"
import { GraphQLClient } from "graphql-request"

/**
 * Create a graphql client
 */
export function client(token?: string): Sdk {
  async function requester<R, V>(doc: DocumentNode, vars?: V): Promise<R> {
    const baseUrl = process.env.NEXT_PUBLIC_PERFOLIO_API
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_PERFOLIO_API env not found")
    }
    const graphqlClient = new GraphQLClient(`${baseUrl}/api/graphql`)
    if (token) {
      graphqlClient.setHeader("Authorization", `Bearer ${token}`)
    }
    const res = await graphqlClient.request(doc, vars)

    if (res.errors) {
      throw new GraphqlError(res.errors.map((e: { message: string }) => e.message))
    }

    return res
  }

  return getSdk(requester)
}

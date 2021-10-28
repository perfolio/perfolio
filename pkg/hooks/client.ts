import { Sdk, getSdk } from "@perfolio/pkg/api/graphql"
import { DocumentNode } from "graphql"
import { GraphqlError } from "@perfolio/util/errors"
import { GraphQLClient } from "graphql-request"

/**
 * Create a graphql client
 */
export function client(token?: string): Sdk {
  async function requester<R, V>(doc: DocumentNode, vars?: V): Promise<R> {
    const graphqlClient = new GraphQLClient("/api/graphql")
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

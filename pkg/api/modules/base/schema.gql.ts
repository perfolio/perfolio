import { gql } from "graphql-modules"

export default gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type Query {
    healthCheck: Boolean!
  }
  type Mutation {
    _empty: Boolean
  }
`

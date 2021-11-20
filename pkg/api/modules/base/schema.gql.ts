import { gql } from "graphql-modules"

export default gql `
  type Query {
    healthCheck: Boolean!
  }
  type Mutation {
    _: Boolean
  }
`

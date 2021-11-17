import { gql } from "graphql-modules"

export default gql`
  type User {
    id: ID!
  }
  type Query {
    user(id: ID!): User
  }
`

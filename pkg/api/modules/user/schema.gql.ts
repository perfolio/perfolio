import { gql } from "graphql-modules"

export default gql `
  type User {
    id: ID!

    stripeCustomerId: String!
  }
  extend type Query {
    user(userId: ID!): User
  }
`

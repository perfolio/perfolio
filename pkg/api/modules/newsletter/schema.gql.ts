import { gql } from "graphql-modules"

export default gql `
  

  extend type Mutation {
    subscribeToNewsletter(email: String!): Boolean
  }
`

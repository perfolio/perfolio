import { gql } from "graphql-modules"

export default gql`
  extend type Mutation {
    signIn(didToken: String!): Boolean
    # Return a new access token
    refresh(didToken: String!): String!
  }
`

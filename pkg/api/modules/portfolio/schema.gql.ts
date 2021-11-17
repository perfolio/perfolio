import { gql } from "graphql-modules"

export default gql`
  type Portfolio {
    """
    unique id
    """
    id: ID!
    """
    Human readable name for the portfolio
    """
    name: String!
    """
    The owner of this portfolio
    """
    user: User!
    """
    The primary portfolio will be displayed by default
    """
    primary: Boolean!

    # """
    # Associated transactions
    # """
    # transactions: [Transaction!]!

    # """
    # Return an index for the performance of the users portfolio
    # """
    # relativeHistory("unix timestamp where to begin calculation" since: Int): [ValueAtTime!]!

    # """
    # Return all assets over time for a given user
    # """
    # absoluteHistory: [AssetHistory!]!
  }

  extend type User {
    portfolio(portfolioId: ID!): Portfolio
    portfolios: [Portfolio!]!
  }
`

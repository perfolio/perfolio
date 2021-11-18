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
    transactions: [Transaction!]!

    # """
    # Return an index for the performance of the users portfolio
    # """
    # relativeHistory("unix timestamp where to begin calculation" since: Int): [ValueAtTime!]!

    # """
    # Return all assets over time for a given user
    # """
    # absoluteHistory: [AssetHistory!]!
  }

  """
  "
  A transactions represents a single purchase or sale of any number of shares of a single asset.
  """
  type Transaction {
    """
    Reference to the actual asset
    """
    assetId: String!
    """
    The of asset. Stocks, Crypto, Real estate for example.
    """
    asset: Asset!
    """
    A timestamp when the transaction was executed in unix time
    """
    executedAt: Int!
    """
    A globally unique identifier for each transaction
    """
    id: ID!
    """
    The portfolio of this transaction
    """
    portfolioId: ID!
    """
    How much each share/item was bought/sold for
    """
    value: Float!
    """
    How many shares/items the user bought or sold
    negative if sold
    """
    volume: Float!
    """
    The market identifier code where the user intends to sell this asset
    """
    mic: String
  }

  extend type User {
    portfolio(portfolioId: ID!): Portfolio
    portfolios: [Portfolio!]!
  }

  extend type Query {
    """
    Return a portfolio by its id
    """
    portfolio(
      """
      The portfolio' unique id
      """
      portfolioId: ID!
    ): Portfolio
  }
`

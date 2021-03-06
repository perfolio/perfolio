import { gql } from "graphql-modules"

export default gql`
  type AbsoluteAssetHistory {
    assetId: ID!
    asset: Asset!
    history: [ValueAndQuantityAtTime!]!
  }
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

    """
    Return an index for the performance of the users portfolio
    """
    relativeHistory("unix timestamp where to begin calculation" since: Int): [ValueAtTime!]!

    """
    Returns a history for each asset. This is not the absolute asset value but rather what
    each asset is worth at each point in time at the given exchange
    """
    absoluteHistory(
      "unix timestamp where to begin calculation"
      since: Int
    ): [AbsoluteAssetHistory!]!
  }

  input CreatePortfolio {
    name: String!
    userId: ID!
    primary: Boolean
  }

  input UpdatePortfolio {
    id: ID!
    name: String
    primary: Boolean
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
  input CreateTransaction {
    """
    Reference to the actual asset
    """
    assetId: String!
    """
    A timestamp when the transaction was executed in unix time
    """
    executedAt: Int!

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

  input UpdateTransaction {
    id: ID!
    """
    Reference to the actual asset
    """
    assetId: String
    """
    A timestamp when the transaction was executed in unix time
    """
    executedAt: Int

    """
    The portfolio of this transaction
    """
    portfolioId: ID
    """
    How much each share/item was bought/sold for
    """
    value: Float
    """
    How many shares/items the user bought or sold
    negative if sold
    """
    volume: Float
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

  extend type Mutation {
    createPortfolio(portfolio: CreatePortfolio!): Portfolio!
    updatePortfolio(portfolio: UpdatePortfolio!): Portfolio!
    deletePortfolio(portfolioId: ID!): Portfolio!
    """
    Clone a portfolio with all its transactions and return the clone
    """
    clonePortfolio(portfolioId: ID!): Portfolio!

    createTransaction(transaction: CreateTransaction!): Transaction!
    updateTransaction(transaction: UpdateTransaction!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
  }
`

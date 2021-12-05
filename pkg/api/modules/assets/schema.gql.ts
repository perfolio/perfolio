import { gql } from "graphql-modules"

export default gql`
  enum AssetType {
    MUTUAL_FUND
    COMMON_STOCK
    CRYPTO
    TODO
  }

  """
  Common fields on all assets
  """
  interface Asset {
    """
    Globally unique id
    """
    id: ID!
    """
    Human readable name
    """
    name: String!
  }

  """
  A sub type of assets that are all traded at exchanges
  """
  interface ExchangeTradedAsset implements Asset {
    """
    A globally unique id
    """
    id: ID!
    """
    International Securities Identification Number
    """
    isin: String!
    """
    The ticker as used by the exchanges.
    """
    ticker: String!
    """
    Human readable name
    """
    name: String!
    """
    URL to the logo or image
    """
    logo: String!

    """
    The type of asset
    """
    type: AssetType!

    """
    The asset value over time at a specific exchange
    """
    assetHistory(mic: ID!, start: Int, end: Int): [ValueAtTime!]!
  }
  """
  Stocks such as company shares and funds.
  """
  interface Stock implements ExchangeTradedAsset & Asset {
    """
    A globally unique id
    """
    id: ID!
    """
    International Securities Identification Number
    """
    isin: String!
    """
    The ticker as used by the exchanges.
    """
    ticker: String!
    """
    Human readable name
    """
    name: String!
    """
    URL to the logo or image
    """
    logo: String!

    """
    The type of asset
    """
    type: AssetType!

    """
    The asset value over time at a specific exchange
    """
    assetHistory(mic: ID!, start: Int, end: Int): [ValueAtTime!]!
    """
    Financial Instrument Global Identifier
    """
    figi: String
  }

  """
  Company stocks
  """
  type Company implements Stock & ExchangeTradedAsset & Asset @cacheControl(maxAge: 3600) {
    """
    A globally unique id
    """
    id: ID!
    """
    International Securities Identification Number
    """
    isin: String!
    """
    The ticker as used by the exchanges.
    """
    ticker: String!
    """
    Human readable name
    """
    name: String!
    """
    URL to the logo or image
    """
    logo: String!

    """
    The type of asset
    """
    type: AssetType!

    """
    The asset value over time at a specific exchange
    """
    assetHistory(mic: ID!, start: Int, end: Int): [ValueAtTime!]!
    """
    Financial Instrument Global Identifier
    """
    figi: String
    """
    The country where this company is registered
    """
    country: String!
    """
    The sector of this company
    """
    sector: String!
  }

  """
  Company stocks
  """
  type ETF implements Stock & ExchangeTradedAsset & Asset @cacheControl(maxAge: 3600) {
    """
    A globally unique id
    """
    id: ID!
    """
    International Securities Identification Number
    """
    isin: String!
    """
    The ticker as used by the exchanges.
    """
    ticker: String!
    """
    Human readable name
    """
    name: String!
    """
    URL to the logo or image
    """
    logo: String!

    """
    The type of asset
    """
    type: AssetType!

    """
    The asset value over time at a specific exchange
    """
    assetHistory(mic: ID!, start: Int, end: Int): [ValueAtTime!]!
    """
    Financial Instrument Global Identifier
    """
    figi: String
  }
  """
  Crypto
  """
  type Crypto implements ExchangeTradedAsset & Asset @cacheControl(maxAge: 3600) {
    """
    A globally unique id
    """
    id: ID!
    """
    International Securities Identification Number
    """
    isin: String!
    """
    The ticker as used by the exchanges.
    """
    ticker: String!
    """
    Human readable name
    """
    name: String!
    """
    URL to the logo or image
    """
    logo: String!

    """
    The type of asset
    """
    type: AssetType!

    """
    The asset value over time at a specific exchange
    """
    assetHistory(mic: ID!, start: Int, end: Int): [ValueAtTime!]!
  }

  extend type Query {
    exchangeTradedAsset(assetId: ID!): ExchangeTradedAsset
  }

  extend type Mutation {
    createExchangeTradedAsset(isin: String!): ExchangeTradedAsset
  }
`

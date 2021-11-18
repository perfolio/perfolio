import { gql, } from "graphql-modules"

export default gql `
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
    The asset value over time at a specific exchange
    """
    assetHistory(exchangeId: ID!, start: Int!, end: Int!): [ValueAndQuantityAtTime!]!
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
    Financial Instrument Global Identifier
    """
    figi: String
    """
    The companys name
    """
    name: String!
    """
    The companys logo url
    """
    logo: String!
    """
    The ticker of a stock. This does not include pre/suffixes for different exchanges
    """
    ticker: String!
    """
    The country where this company is registered
    """
    country: String!
    """
    The asset value over time at a specific exchange
    """
    assetHistory(exchangeId: ID!, start: Int!, end: Int!): [ValueAndQuantityAtTime!]!
  }

  """
  Company stocks
  """
  type Company implements Stock & ExchangeTradedAsset & Asset {
    """
    A globally unique id
    """
    id: ID!
    """
    International Securities Identification Number
    """
    isin: String!
    """
    Financial Instrument Global Identifier
    """
    figi: String!
    """
    The companys name
    """
    name: String!
    """
    The companys logo url
    """
    logo: String!
    """
    The ticker of a stock. This does not include pre/suffixes for different exchanges
    """
    ticker: String!
    """
    The country where this company is registered
    """
    country: String!
    """
    The sector of this company
    """
    sector: String!
    """
    The asset value over time at a specific exchange
    """
    assetHistory(exchangeId: ID!, start: Int!, end: Int!): [ValueAndQuantityAtTime!]!
  }
  """
  Crypto
  """
  type Crypto implements ExchangeTradedAsset & Asset {
    """
    A globally unique id
    """
    id: ID!

    """
    International Securities Identification Number
    """
    isin: String!
    """
    Dummy field
    """
    name: String!
    """
    A
    """
    ticker: String!
    """
    B
    """
    logo: String!
    """
    The asset value over time at a specific exchange
    """
    assetHistory(exchangeId: ID!, start: Int!, end: Int!): [ValueAndQuantityAtTime!]!
  }
`

import { gql } from "graphql-modules"

export default gql`
  """
  An exchange where shares are traded
  """
  type Exchange @cacheControl(maxAge: 86400) {
    """
    "    Market Identifier Code using ISO 10383
    """
    mic: ID!
    """
    Full name of the exchange.
    """
    description: String!
    """
    2 letter case insensitive string of country codes using ISO 3166-1 alpha-2
    """
    region: String!
    """
    Exchange Suffix to be added for symbols on that exchange
    """
    suffix: String
  }

  extend type Query {
    """
    "
    Get a list of all availale exchanges
    """
    exchanges: [Exchange!]!
  }
`

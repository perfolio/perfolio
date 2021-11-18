import { gql } from "graphql-modules"

export default gql`
  """
  Settings that can be customized by the user such as preferences as well as defaults
  """
  type Settings {
    """
    The user's default currency. Everything will be converted to this currency.
    """
    defaultCurrency: String!
    """
    The user's default exchange. At the start only 1 exchange can be used.
    """
    defaultExchange: Exchange!
    """
    Used to store the exchange in the db
    """
    defaultExchangeMic: String!
  }

  """
  "
  Create a new user settings object when a new user signs up
  """
  input CreateSettings {
    """
    The user's default currency. Everything will be converted to this currency.
    """
    defaultCurrency: String!
    """
    The user's default exchange. At the start only 1 exchange can be used.
    This must be the MIC!
    """
    defaultExchange: String!
    """
    The unique user id
    """
    userId: ID!
  }
  """
  Update only some values.
  """
  input UpdateSettings {
    """
    The user's default currency. Everything will be converted to this currency.
    """
    defaultCurrency: String
    """
    The user's default exchange. At the start only 1 exchange can be used.
    This must be the MIC!
    """
    defaultExchange: String
    """
    The unique user id
    """
    userId: ID!
  }

  extend type User {
    settings: Settings!
  }

  extend type Mutation {
    createSettings(
      "A complete settings object that can be written to the databse as is"
      settings: CreateSettings!
    ): Settings!
    """
    Only update some values in the user settings.
    """
    updateSettings("A partial settings object" settings: UpdateSettings!): Settings!
  }
`

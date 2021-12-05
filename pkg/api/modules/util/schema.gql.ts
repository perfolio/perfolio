import { gql } from "graphql-modules"

export default gql`
  """
  Generic Value and Quantity over time.
  This is used for assets for example.
  """
  type ValueAndQuantityAtTime {
    """
    How many shares/items
    """
    quantity: Float!
    """
    A timestamp when this value and quantity was
    """
    time: Int!
    """
    The value of each share/item
    """
    value: Float!
  }

  """
  Anything that has a changing value over time can use this.
  """
  type ValueAtTime {
    """
    A unix timestamp.
    """
    time: Int!
    """
    Can be anything really. Prices, percentages, or something else entirely.
    """
    value: Float!
  }
`

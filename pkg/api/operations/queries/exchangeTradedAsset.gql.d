query exchangeTradedAsset($id: ID!) {
  exchangeTradedAsset(id: $id) {
    __typename
    id
    ticker
    logo
    name

    ... on Stock {
      ... on Company {
        sector
        country
      }
    }
  }
}

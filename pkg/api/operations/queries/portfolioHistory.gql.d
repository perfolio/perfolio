query portfolioHistory($portfolioId: ID!) {
  portfolio(portfolioId: $portfolioId) {
    absoluteHistory {
      assetId
      asset {
        id
        name
        ... on ExchangeTradedAsset {
          __typename
          ticker
          logo
          ... on Company {
            __typename
            country

            sector
          }

          ... on Crypto {
            __typename
          }
        }
      }
      history {
        value
        time
        quantity
      }
    }
  }
}

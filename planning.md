# Services

- User
- exchange
  - getCompany(companyId)
  - getCurrentValue(companyId)
  - get timeline of closing prices
    {
    02-02-2020: 12.4,
    03-02-2020: 13.1,
    }
- vault

  - CRUD Transcaction
  - get timeline of holdings
    {
    02-02-2020: 2,
    03-02-2020: 1,
    }
  - get current holdings

- ::NAME::
  - getPortfolio = (vault.getCurrentHoldings x exchange.getCurrentValue)
  - getHistory = (vault.getTimeline x exchange.getTimeline)

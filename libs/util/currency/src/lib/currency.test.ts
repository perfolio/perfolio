import { getCurrency } from "./currency"

it("works with germany", () => {
  const { currency, symbol } = getCurrency("DE")
  expect(currency).toBe("EUR")
  expect(symbol).toBe("€")
})

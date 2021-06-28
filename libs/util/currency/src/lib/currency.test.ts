import { getCurrency } from "./currency"

it("works with germany", () => {
  const currency = getCurrency("DE")
  expect(currency).toBe("€")
})

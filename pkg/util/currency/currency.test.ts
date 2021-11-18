import { getCurrency, getCurrencySymbol, } from "./currency"

it("works with germany", () => {
  expect(getCurrency("DE",),).toBe("EUR",)
  expect(getCurrencySymbol("EUR",),).toBe("€",)
})

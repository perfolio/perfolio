import { currencyCodes, } from "./currencyCodes"
import { currencySymbols, } from "./currencySymbols"
/**
 * Get the currency abbreviation from a country
 */
export function getCurrency(country: string,): string {
  const currency = currencyCodes[country.toUpperCase()]
  if (!currency) {
    throw new Error(`No currency found for country: ${country}`,)
  }
  return currency
}
/**
 * Get the currency ticker from a currency
 */
export function getCurrencySymbol(currency: string | undefined,): string {
  if (typeof currency !== "string") {
    return ""
  }
  const ticker = currencySymbols[currency.toUpperCase()]
  if (!ticker) {
    throw new Error(`No ticker found for currency: ${currency}`,)
  }
  return ticker
}

import { currencyCodes } from "./currencyCodes"
import { currencySymbols } from "./currencySymbols"
/**
 * Get the currency and symbol from a country
 */
export function getCurrency(country: string): string {
  const currency = currencyCodes[country.toUpperCase()]
  if (!currency) {
    throw new Error(`No currency found for country: ${country}`)
  }
  const symbol = currencySymbols[currency.toUpperCase()]
  if (!symbol) {
    throw new Error(`No symbol found for currency: ${currency}`)
  }
  return symbol
}

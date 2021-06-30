import { currencyCodes } from "./currencyCodes"
import { currencySymbols } from "./currencySymbols"
/**
 * Get the currency abbreviation from a country
 */
export function getCurrency(country: string): string {
  const currency = currencyCodes[country.toUpperCase()]
  if (!currency) {
    throw new Error(`No currency found for country: ${country}`)
  }
  return currency
}
/**
 * Get the currency symbol from a country
 */
export function getCurrencySymbol(country: string): string {
  const currency = getCurrency(country)
  const symbol = currencySymbols[currency.toUpperCase()]
  if (!symbol) {
    throw new Error(`No symbol found for currency: ${currency}`)
  }
  return symbol
}

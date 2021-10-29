import { resolve } from "path"
import fs from "fs"

type Namespace = "landing" | "app"
type Locale = "en" | "de"

/**
 * Load a translations file from local fs
 */
const loadTranslation = (namespace: Namespace, locale: Locale): Promise<Record<string, string>> => {
  const path = resolve("public", "locales", locale, `${namespace}.json`)
  try {
    return JSON.parse(fs.readFileSync(path).toString())
  } catch (err) {
    throw new Error(`Unable to load locale "${locale}" from ${path}: ${err}`)
  }
}

/**
 * Return all translations for a given locale and namespaces
 */
export function getTranslations(
  locale: string | undefined,
  namespaces: Namespace[],
): Record<string, string> {
  locale ??= "en"

  return Object.assign({}, ...namespaces.map((ns) => loadTranslation(ns, locale as Locale)))
}

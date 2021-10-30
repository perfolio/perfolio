import { join, resolve } from "path"
import fs from "fs"
import { env } from "@chronark/env"

type Namespace = "landing" | "app"
type Locale = "en" | "de"

/**
 * Load a translations file from local fs
 */
const loadTranslation = (namespace: Namespace, locale: Locale): Promise<Record<string, string>> => {
  const relativePath = ["pkg", "i18n", "locales", locale, `${namespace}.json`]
  let path: string

  switch (env.get("VERCEL_ENV")) {
    case "production":
    case "preview":
      path = join(
        "https://raw.githubusercontent.com/perfolio/perfolio",
        env.require("VERCEL_GIT_COMMIT_REF"),
        ...relativePath,
      )
      break

    default:
      path = resolve(...relativePath)
      break
  }

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

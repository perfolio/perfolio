import { join, resolve } from "path"
import fs from "fs"
import { env } from "@chronark/env"

type Namespace = "landing" | "app"
type Locale = "en" | "de"

/**
 * Load a translations file from local fs
 */
const loadTranslation = async (
  namespace: Namespace,
  locale: Locale,
): Promise<Record<string, string>> => {
  try {
    const relativePath = ["pkg", "i18n", "locales", locale, `${namespace}.json`]

    switch (env.get("VERCEL_ENV")) {
      case "production":
      case "preview":
        return JSON.parse(
          await fetch(
            join(
              "https://raw.githubusercontent.com/perfolio/perfolio",
              env.require("VERCEL_GIT_COMMIT_REF"),
              ...relativePath,
            ),
          ).then((res) => res.json()),
        )

      default:
        return JSON.parse(fs.readFileSync(resolve(...relativePath)).toString())
    }
  } catch (err) {
    throw new Error(`Unable to load locale "${locale}": ${err}`)
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

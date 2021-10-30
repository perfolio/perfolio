import { resolve } from "path"
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
        const url = [
          "https://raw.githubusercontent.com/perfolio/perfolio",
          env.require("VERCEL_GIT_COMMIT_REF"),
          ...relativePath,
        ].join("/")
        return JSON.parse(
          await fetch(url)
            .then((res) => res.json())
            .catch((err) => {
              throw new Error(`Unable to get ${url}: ${err}`)
            }),
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
export async function getTranslations(
  locale: string | undefined,
  namespaces: Namespace[],
): Promise<Record<string, string>> {
  locale ??= "en"

  return Object.assign(
    {},
    ...(await Promise.all(
      namespaces.map(async (ns) => await loadTranslation(ns, locale as Locale)),
    )),
  )
}

import { Locale, Namespace, Translation } from "./types"
import { common as deCommon } from "./locales/de/common"
import { common as enCommon } from "./locales/en/common"

import { footer as deFooter } from "./locales/de/footer"
import { footer as enFooter } from "./locales/en/footer"
import { landing as deLanding } from "./locales/de/landing"
import { landing as enLanding } from "./locales/en/landing"

export const i18n: Translation = {
  common: {
    de: deCommon,
    en: enCommon,
  },
  footer: {
    de: deFooter,
    en: enFooter,
  },
  landing: {
    de: deLanding,
    en: enLanding,
  },
}

/**
 * Return all translations for a given locale and namespaces 
 * 
 * @example
 * const i18n = translate("en", ["common", "footer"])

 */
export function getTranslations(
  locale: string | undefined,
  namespaces: Namespace[],
): Record<string, string> {
  locale ??= "en"
  return Object.assign({}, ...namespaces.map((ns) => i18n[ns][locale as Locale]))
}

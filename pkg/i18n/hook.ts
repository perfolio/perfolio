import { useContext } from "react"
import { I18nContext } from "./context"

/**
 * On a page itself you should add the translations object that you get from
 * static props.
 *
 * In components you must omit it because you would overwrite all translations
 */
export const useI18n = (translations?: Record<string, string>): { t: (key: string) => string } => {
  const ctx = useContext(I18nContext)
  if (translations) {
    ctx.setTranslations(translations)
  }
  return { t: ctx.t }
}

import React from "react"
import { I18nContext, } from "./context"

export class TranslationError extends Error {
  constructor(key: string, translations: Record<string, string>,) {
    super(`Translation error: ${key} is not found in ${Object.keys(translations,)}`,)
  }
}

export const I18nProvider: React.FC = ({ children, },) => {
  /**
   * I can not use useState, because it actually doesn't update in real time
   * and it would throw errors.
   */
  let translations: Record<string, string> = {}

  const setTranslations = (t: Record<string, string>,): void => {
    translations = t
  }

  const t = (key: string,): string => {
    const translation = translations[key]
    if (!translation) {
      throw new TranslationError(key, translations,)
    }
    return translation
  }

  return <I18nContext.Provider value={{ t, setTranslations, }}>{children}</I18nContext.Provider>
}

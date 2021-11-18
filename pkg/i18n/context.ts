import { createContext, } from "react"
export interface I18nContextInterface {
  t: (key: string,) => string
  setTranslations: (translations: Record<string, string>,) => void
}

export const I18nContext = createContext<I18nContextInterface>({
  t: () => {
    throw new Error("Implement me",)
  },
  setTranslations: () => {
    throw new Error("Implement me",)
  },
},)

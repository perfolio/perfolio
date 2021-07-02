export type Namespace = "common" | "footer" | "landing"
export type Locale = "en" | "de"

export type Translation = {
  [namespace in Namespace]: {
    [locale in Locale]: {
      [key: string]: string
    }
  }
}

import { Magic } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"
const key = process.env["NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY"]
if (!key) {
  throw new Error("NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY is not defined")
}

export const magic = () => {
  if (typeof window === "undefined") {
    throw new Error("Window")
  }
  return new Magic(key, {
    extensions: [new OAuthExtension()],
  })
}

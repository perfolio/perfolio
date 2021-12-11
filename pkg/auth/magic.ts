import { Magic } from "magic-sdk"

const key = process.env["NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY"]
if (!key) {
  throw new Error("NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY is not defined")
}
export const magic = typeof window !== "undefined" ? new Magic(key) : {} as Magic

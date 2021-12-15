import { z } from "zod"
const permissions = [
  "create:transaction",
  "read:transaction",
  "update:transaction",
  "delete:transaction",

  "create:portfolio",
  "read:portfolio",
  "update:portfolio",
  "delete:portfolio",

  "create:user",
  "read:user",
  "update:user",
  "delete:user",

  "create:asset",
  "read:asset",
  "update:asset",
  "delete:asset",

  "create:absoluteAssetHistory",
  "read:absoluteAssetHistory",
  "update:absoluteAssetHistory",
  "delete:absoluteAssetHistory",

  "create:absolutePortfolioHistory",
  "read:absolutePortfolioHistory",
  "update:absolutePortfolioHistory",
  "delete:absolutePortfolioHistory",

  "create:relativePortfolioHistory",
  "read:relativePortfolioHistory",
  "update:relativePortfolioHistory",
  "delete:relativePortfolioHistory",

  "create:settings",
  "read:settings",
  "update:settings",
  "delete:settings",

  "create:exchange",
  "read:exchange",
  "update:exchange",
  "delete:exchange",
] as const

const permissionValidation = z.enum(permissions)
export const permissionsValidation = z.array(permissionValidation)

export type Permission = z.infer<typeof permissionValidation>

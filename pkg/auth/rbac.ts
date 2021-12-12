import { Role } from "./roles"
import type { Permission } from "./permissions"

export class RBAC {
  static readonly roles: Record<Role, Permission[]> = {
    "subscription:growth": [
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
    ],

    "subscription:pro": [],
    admin: [],
  }

  static getPermissions(roles: Role[]): Permission[] {
    return [...new Set(roles.flatMap((r) => RBAC.roles[r]))]
  }
}

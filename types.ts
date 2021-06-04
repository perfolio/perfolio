import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import {z} from "zod"

export const RoleValidation = z.enum(["ADMIN", "USER"]);
export type Role = z.infer<typeof RoleValidation>
declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: string
      role: Role
    }
  }
}

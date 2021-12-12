import { z } from "zod"
const roles = ["subscription:growth", "subscription:pro", "admin"] as const

const roleValidation = z.enum(roles)
export const rolesValidation = z.array(roleValidation)

export type Role = z.infer<typeof roleValidation>

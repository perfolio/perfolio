import { z } from "zod"
import { Expr } from "faunadb"
/**
 * This is what the fauna `Get` function usually returns .
 */
export interface QueryResponse<T> {
  ref: Expr
  ts: number
  data: T
}

export const Ref = z.any()

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  hashedPassword: z.string(),
  role: z.string(),
})

export const SessionSchema = z.object({
  expiresAt: z.date(),
  handle: z.string(),
  user: Ref,
  hashedSessionToken: z.string(),
  antiCSRFToken: z.string(),
  publicData: z.string(),
  privateData: z.string(),
})
